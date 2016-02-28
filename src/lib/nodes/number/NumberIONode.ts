import IONode from './../IONode';
import DataTypes from './../../../core/data/DataTypes';
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
		this.dataType = DataTypes.Number;
		this.categoryType = CategoryTypes.Number;
	}
}