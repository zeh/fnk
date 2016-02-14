import MultipleInputNode from './MultipleInputNode'
import DataType from './../../core/data/DataType';
import Node from './../../core/graph/Node'
import Connector from './../../core/graph/connectors/Connector';

/**
 * @author zeh fernando
 */
export default class OperationNode extends MultipleInputNode {
	
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
	}
	
	protected populateConnectors() {
		super.populateConnectors();
		
		this.outputConnectors.add(new Connector(this.dataType, "Output", Node.CONNECTOR_ID_OUTPUT, true, true));
	}
	
	protected innerProcess() {
		let i:number;
		let numItems = 0;
		for (i = 0; i < this.inputConnectors.length; i++) {
			numItems = Math.max(numItems, this.inputConnectors.getAt(i).getNumItems());
		}
		let ga:any[] = [];
		for (i = 0; i < numItems; i++) {
			ga.push(this.getProcessedInputs(i));
		}
		this.outputConnectors.get(Node.CONNECTOR_ID_OUTPUT).setValue(ga, this.dataType);
	}
	
	protected getProcessedInputs(position:number):any {
		return position;
	}
}
