import DataTypes from "./../data/DataTypes";

/**
 * @author zeh fernando
 */
export default class Connector {

	// Properties
	public dataType:DataTypes;
	public anyDataType:boolean;
	public description:string;
	public id:string;
	public allowsArray:boolean;
	public allowsMultipleOutputs:boolean;
	public value:any;
	public hasChanged:boolean;


	// ================================================================================================================
	// CONSTRUCTOR ----------------------------------------------------------------------------------------------------

	constructor(dataType:DataTypes,
				description:string,
				id:string,
				allowsArray = true,
				allowsMultipleOutputs = false,
				allowAnyDataType = false) {
		// TODO:localization: default connector description
		this.dataType = dataType;
		this.anyDataType = allowAnyDataType;
		this.description = description;
		this.id = id;
		this.allowsArray = allowsArray;
		this.allowsMultipleOutputs = allowsMultipleOutputs;
		this.value = [this.dataType.getDefaultValue()];
		this.hasChanged = true;
	}


	// ================================================================================================================
	// PUBLIC INTERFACE -----------------------------------------------------------------------------------------------

	public resetChangeFlag() {
		// Marks this connector's values as not changed
		this.hasChanged = false;
	}

	public setValue(value:any[], fromType:DataTypes) {
		// Set the value of this connector to a new array of a specific type
		if (this.anyDataType) {
			this.value = value.slice(0); // Duplicated array
			this.dataType = fromType;
		} else {
			this.value = DataTypes.convertDataArray(value, fromType, this.dataType);
		}
		this.hasChanged = true;
	}

	public setValueAt(position:number, value:any, fromType:DataTypes) {
		// Set the value at a particular position
		this.value[position] = DataTypes.convertData(value, fromType, this.dataType);
		this.hasChanged = true;
	}

	public getValue():any[] {
		// Return the array of values
		return this.value.slice(0);
	}

	public getValueAt(position:number):any {
		return this.value[position % this.value.length];
	}

	public getNumItems():number {
		return this.value.length;
	}


	// ================================================================================================================
	// PRIVATE INTERFACE ----------------------------------------------------------------------------------------------


}
