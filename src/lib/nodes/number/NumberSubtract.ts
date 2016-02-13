import OperationNode from './../OperationNode'
import DataType from './../../../core/data/DataType';

/**
 * @author zeh fernando
 */
export default class NumberSubtract extends OperationNode {
	
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
		this.description = ["-"];
		// TODO: Set: category type
		this.dataType = DataType.NUMBER;
	}
	
	protected getProcessedInputs(position:number):any {
		let total = Number(this.inputConnectors.getConnectorAt(0).getValueAt(position));
		for (let i = 1; i < this.inputConnectors.getNumConnectors(); i++) {
			total -= Number(this.inputConnectors.getConnectorAt(i).getValueAt(position));
		}
		return total;
	}
}