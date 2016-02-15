import Patch from './../patch/Patch';
import Connector from './../connectors/Connector';
import ConnectorList from './../connectors/ConnectorList';
import SimpleSignal from './../signals/SimpleSignal';
import CategoryTypes from './../data/CategoryTypes';
import DataTypes from './../data/DataTypes';

/**
 * @author zeh fernando
 */
export default class Node {

	// Constants
	public static CONNECTOR_ID_INPUT = "input";
	public static CONNECTOR_ID_OUTPUT = "output";
	public static CONNECTOR_ID_SEPARATOR = "-";

	// Pseudo-static constants
	public captions:string[];						// A visible description of the node. Same as the name of the node. Example: "+", "IO"
	public categoryType:CategoryTypes;
	//		protected var HelpXML:Class;

	// Properties
	public alwaysProcess:boolean;					// Whether it should always execute on every frame
	public patch:Patch;								// Patch where this node is in
	public needsProcess:boolean;					// Whether it needs processing (because something has changed and its result is dirty)

	public inputConnectors:ConnectorList;
	public outputConnectors:ConnectorList;
	public parameters:ConnectorList;
	
	public onChangedCaption:SimpleSignal<(node:Node) => void>;
	public onChangedValue:SimpleSignal<(node:Node) => void>;
	public onChangedOutputConnector:SimpleSignal<(node:Node, connectorId:string) => void>;

	
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
			this.dispatchValueChanges();
			this.resetChangeFlags();
		}
	}

	public resetChangeFlags() {
		this.needsProcess = false;
		this.inputConnectors.resetChangeFlag();
		this.outputConnectors.resetChangeFlag();
	}

	public toString():string {
		return "[" + this.captions + " (" + this.categoryType + ")]";
	}

	public getContentDescription():any[] {
		// Returns a description of the content it holds (used for the visual node) - normally, an array
		return this.captions;
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
		this.captions = [];
		this.categoryType = CategoryTypes.Other;
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

	protected setDescription(captions:string[]) {
		// Set the description (must be an array)
		this.captions = captions;
		this.onChangedCaption.dispatch();
	}


	// ================================================================================================================
	// PRIVATE INTERFACE ----------------------------------------------------------------------------------------------

	private createSignals() {
		// Create signals for event-like dispatching
		this.onChangedCaption = new SimpleSignal<(node:Node) => void>();
		this.onChangedValue = new SimpleSignal<(node:Node) => void>();
		this.onChangedOutputConnector = new SimpleSignal<(node:Node, connectorId:string) => void>();
	}
	
	private dispatchValueChanges() {
		this.dispatchChange();

		let connector:Connector;
		for (let i = 0; i < this.outputConnectors.length; i++) {
			connector = this.outputConnectors.getAt(i); 
			if (this.alwaysProcess || connector.hasChanged) {
				this.onChangedOutputConnector.dispatch(this, connector.id);
			}
		}
	}
	
	private dispatchChange() {
		this.onChangedValue.dispatch(this);
	}

	private destroySignals() {
		this.onChangedCaption = null;
		this.onChangedValue = null;
		this.onChangedOutputConnector = null;
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
