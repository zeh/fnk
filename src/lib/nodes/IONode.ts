import Node from './../../core/nodes/Node'
import DataTypes from './../../core/data/DataTypes';
import Connector from './../../core/connectors/Connector';

/**
 * @author zeh fernando
 */
export default class IONode extends Node {
	
	// Properties
	protected dataType:DataTypes;


	// ================================================================================================================
	// CONSTRUCTOR ----------------------------------------------------------------------------------------------------

	constructor() {
		super();
	}


	// ================================================================================================================
	// EXTENSIBLE INTERFACE -------------------------------------------------------------------------------------------
	
	protected setInitialData() {
		// Extend
		super.setInitialData();
		this.dataType = DataTypes.None;
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
		
		// Actually populate the connector list with the expected connectors
		this.inputConnectors.add(new Connector(this.dataType, "Input", Node.CONNECTOR_ID_INPUT));
		this.outputConnectors.add(new Connector(this.dataType, "Output", Node.CONNECTOR_ID_OUTPUT, true, true));
	}

	protected innerProcess() {
		super.innerProcess();

		// Process the node, using the input and creating the output
		// TODO: setting the value like this is wrong
		this.outputConnectors.get(Node.CONNECTOR_ID_OUTPUT).setValue(this.inputConnectors.get(Node.CONNECTOR_ID_INPUT).getValue(), this.dataType);

		// Update display description
		this.setDescription(this.inputConnectors.get(Node.CONNECTOR_ID_INPUT).getValue());

	}
}


/*
// ================================================================================================================
// CONSTRUCTOR ----------------------------------------------------------------------------------------------------

};



// ================================================================================================================
// ADDITIONAL interface -------------------------------------------------------------------------------------------

/*
public function getValue(): Array {
	var outputConnector:Connector = outputConnectors.getConnector(CONNECTOR_ID_OUTPUT);
	return outputConnector.getValue();
}

public function getType(): String {
	return dataType;
}

public function getValueAt(__index:uint):* {
	var outputConnector:Connector = outputConnectors.getConnector(CONNECTOR_ID_OUTPUT);
	return outputConnector.getValueAt(__index);
}

public function setValueAt(__index:uint, __value:*, __fromType:String):void {
	var inputConnector:Connector = inputConnectors.getConnector(CONNECTOR_ID_INPUT);
	inputConnector.setValueAt(__index, __value, __fromType);
}

public function getAdditionalParameters():Array {
	return [];
}
*/

// ================================================================================================================
// GENERIC interface ----------------------------------------------------------------------------------------------

//FNK.IONode.prototype.getContentDescription = function() {
//	// Returns a description of the content it holds
//	return this.containedValue;
//};
