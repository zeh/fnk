import Node from './../../core/graph/Node'
import DataType from './../../core/data/DataType';
import Connector from './../../core/graph/connectors/Connector';

/**
 * @author zeh fernando
 */
export default class MultipleInputNode extends Node {
	
	// Properties
	protected numInputs:number;
	protected numInputsMin:number;
	protected numInputsMax:number;
	protected dataType:string;
	protected anyDataType:boolean;


	// ================================================================================================================
	// CONSTRUCTOR ----------------------------------------------------------------------------------------------------

	constructor() {
		super();
	}


	// ================================================================================================================
	// EXTENSIBLE INTERFACE -------------------------------------------------------------------------------------------
	
	protected setInitialData() {
		super.setInitialData();
		
		this.numInputs = 2;
		this.numInputsMin = 2;
		this.numInputsMax = 10;
		this.dataType = DataType.NULL;
		this.anyDataType = false;
	}
	
	protected createParameters() {
		super.createParameters();
	}
	
	protected populateParameters() {
		super.populateParameters();
	}

	protected createConnectors() {
		super.createConnectors();
	}

	protected populateConnectors() {
		super.populateConnectors();
		
		this.createInputConnectors();
	}

	protected innerProcess() {
		super.innerProcess();

		// Process the node, using the input and creating the output
		// TODO: setting the value like this is wrong
		this.outputConnectors.get(Node.CONNECTOR_ID_OUTPUT).setValue(this.inputConnectors.get(Node.CONNECTOR_ID_INPUT).getValue(), this.dataType);

		// Update display description
		this.setDescription(this.inputConnectors.get(Node.CONNECTOR_ID_INPUT).getValue());

	}
	
	// ================================================================================================================
	// PRIVATE INTERFACE ----------------------------------------------------------------------------------------------
	
	private createInputConnectors() {
		//console.log("@@@@@@@@@@@@@@ Creating input connectors [" + this.description + "]; has " + this.inputConnectors.getNumConnectors() + ", need " + this.numInputs);
		let i:number;
		if (this.inputConnectors.length > this.numInputs) {
			// Delete input connectors as needed
			for (i = 0; i < this.inputConnectors.length - this.numInputs; i++) {
				this.inputConnectors.removeAt(this.inputConnectors.length - 1);
			}
			// TODO: test if slice is correctly done
		} else if (this.inputConnectors.length < this.numInputs) {
			// Create input connectors as needed
			for (i = this.inputConnectors.length; i < this.numInputs; i++) {
				//console.log("@@@@@@@@@@@@@@ Creating input of id " + (Node.CONNECTOR_ID_INPUT + Node.CONNECTOR_ID_SEPARATOR + i));
				this.inputConnectors.add(new Connector(this.dataType, "Input " + (i+1), Node.CONNECTOR_ID_INPUT + Node.CONNECTOR_ID_SEPARATOR + i, true, false, this.anyDataType));
				// TODO: connector name must come from localized string
			}
		}
	}
}
