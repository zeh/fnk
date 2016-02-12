import IONode from './../IONode'
import DataType from './../../../core/data/DataType';

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
		this.description = ["IO"];
		// TODO: Set: category type
		this.dataType = DataType.NUMBER;
	}
}