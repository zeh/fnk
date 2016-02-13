import Patch from './Patch';
import ConnectorList from './connectors/ConnectorList';
import SimpleSignal from './../signals/SimpleSignal';

/**
 * @author zeh fernando
 */
export default class Node {

	// Constants
	public static CONNECTOR_ID_INPUT = "input";
	public static CONNECTOR_ID_OUTPUT = "output";
	public static CONNECTOR_ID_SEPARATOR = "-";

	// Pseudo-static constants
	public description:string[] = []; // A description of the node. Same as the name of the node. Example: "+", "IO"
	public categoryType:string = "*category*";
	//public categoryType = FNK.CategoryType.OTHER;
	//		protected var HelpXML:Class;

	// Properties
	public alwaysProcess:boolean;					// Whether it should always execute on every frame
	public patch:Patch;								// Patch where this node is in
	public needsProcess:boolean;					// Whether it needs processing (because something has changed and its result is dirty)

	public inputConnectors:ConnectorList;
	public outputConnectors:ConnectorList;
	public parameters:ConnectorList;
	
	public changeContentDescriptionSignal:SimpleSignal<() => void>;
	public changeAnyOutputSignal:SimpleSignal<() => void>;

	
	// ================================================================================================================
	// CONSTRUCTOR ----------------------------------------------------------------------------------------------------

	constructor() {
		this.setInitialData();
		this.createParameters();
		this.populateParameters();
		this.createConnectors();
		this.populateConnectors();
		this.createSignals();
	}


	// ================================================================================================================
	// PUBLIC INTERFACE -----------------------------------------------------------------------------------------------
	
	public getInputConnectors():ConnectorList {
		return this.inputConnectors;
	}

	public getOutputConnectors():ConnectorList {
		return this.outputConnectors;
	}
	
	public process() {
		if (this.alwaysProcess || this.inputConnectors.getHasChangedAny() || this.needsProcess) {
			// Actual processing
			this.innerProcess();
			this.resetChangeFlags();
			this.changeAnyOutputSignal.dispatch();
		}
	}

	public resetChangeFlags() {
		this.needsProcess = false;
		this.inputConnectors.resetChangeFlag();
		this.outputConnectors.resetChangeFlag();
	}

	public toString():string {
		//return "[" + getQualifiedClassName(this) + "]";
		return "[" + this.description + " (" + this.categoryType + ")]";
	}

	public getContentDescription():any[] {
		// Returns a description of the content it holds (used for the visual node) - normally, an array
		return this.description;
	}

	public dispose() {
		//dispatchEvent(new NodeEvent(NodeEvent.DISPOSE, this));
		this.patch = undefined;
		this.inputConnectors = undefined;
		this.outputConnectors = undefined;
		this.destroySignals();
	}

	
	// ================================================================================================================
	// EXTENSIBLE INTERFACE -------------------------------------------------------------------------------------------
	
	protected setInitialData() {
		// Extend
	}
	
	protected createParameters() {
		// Extend
		this.parameters = new ConnectorList();
	}
	
	protected populateParameters() {
		// Actually populate the parameter list with the expected parameters
		// Extend
	}

	protected createConnectors() {
		// Extend
		this.inputConnectors = new ConnectorList();
		this.outputConnectors = new ConnectorList();
	}

	protected populateConnectors() {
		// Actually populate the connector list with the expected connectors
		// Extend
	}

	protected innerProcess() {
		// Process the node, using the input and creating the output
		// Extend
	}

	protected setDescription(description:string[]) {
		// Set the description (must be an array)
		this.description = description;
		this.changeContentDescriptionSignal.dispatch();
	}


	// ================================================================================================================
	// PRIVATE INTERFACE ----------------------------------------------------------------------------------------------

	private createSignals() {
		// Create signals for event-like dispatching
		this.changeContentDescriptionSignal = new SimpleSignal<() => void>();
		this.changeAnyOutputSignal = new SimpleSignal<() => void>();
	}

	private destroySignals() {
		// Create signals for event-like dispatching
		this.changeContentDescriptionSignal = undefined;
		this.changeAnyOutputSignal = undefined;
	}
	
}

/*

*/
/*
public function get hasHelpPatch(): Boolean {
	return Boolean(HelpXML);
}

public function get helpPatchSource(): XML {
	if (hasHelpPatch) {
		var patchXML:XML = XML(new HelpXML());
		return patchXML;
	}
	return null;
}
*/
