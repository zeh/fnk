import IONode from './../IONode'
import DataType from './../../../core/data/DataType';
import CategoryTypes from './../../../core/data/CategoryTypes';

/**
 * @author zeh fernando
 */
export default class NumberIONode extends IONode {
	
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
		this.captions = ["IO"];
		this.dataType = DataType.NUMBER;
		this.categoryType = CategoryTypes.Number;
	}
}