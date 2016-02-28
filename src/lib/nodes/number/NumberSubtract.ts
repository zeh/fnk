import OperationNode from './../OperationNode';
import DataTypes from './../../../core/data/DataTypes';
import CategoryTypes from './../../../core/data/CategoryTypes';

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
		this.captions = ["-"];
		this.dataType = DataTypes.Number;
		this.categoryType = CategoryTypes.Number;
	}

	protected getProcessedInputs(position:number):any {
		let total = Number(this.inputConnectors.getAt(0).getValueAt(position));
		for (let i = 1; i < this.inputConnectors.length; i++) {
			total -= Number(this.inputConnectors.getAt(i).getValueAt(position));
		}
		return total;
	}
}