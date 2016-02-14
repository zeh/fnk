/**
 * @author zeh fernando
 */
export default class DataTypes {

	// Pseudo-enum types	
	public static Number:DataTypes;
	public static String:DataTypes;
	public static Color:DataTypes;
	// Graphic, Image, Filter, ...
	public static None:DataTypes;
	
	// Properties
	public static description:string = "";
	public static canSerialize:boolean = false;
	public static canEdit:boolean = true;


	// ================================================================================================================
	// PUBLIC INTERFACE -----------------------------------------------------------------------------------------------
	
	public getDefaultValue():any {
		return null;
	}
	
	public serialize():string {
		return "";
	}

	
	// ================================================================================================================
	// STATIC INTERFACE -----------------------------------------------------------------------------------------------

	public static convertDataArray(value:any[], fromType:DataTypes, toType:DataTypes):any[] {
		// Converts an entire array of data from one type to the other
		let newValue:any[] = [];
		for (let i = 0; i < value.length; i++) {
			newValue[i] = this.convertData(value[i], fromType, toType);
		}
		return newValue;
	}

	public static convertData(value:any, fromType:DataTypes, toType:DataTypes):any {
		// Converts one item of data from one type to the other
		let tempN:number;
		if (fromType == toType) {
			// Same type, no need for conversion
			return value;
		} else {
			// TODO: use the DataType classes' own functions for conversion?
			// Different types
			if (fromType == DataTypes.String) {
				// From string...
				if (toType == DataTypes.Number || toType == DataTypes.Color) {
					// ...to number
					tempN = parseFloat(String(value));
					if (isNaN(tempN)) tempN = 0;
					return tempN;
				} else if (toType == DataTypes.Color) {
					// ...to color
					tempN = parseFloat(String(value));
					if (isNaN(tempN)) tempN = 0;
					return tempN;
				}
			} else if (fromType == DataTypes.Number || fromType == DataTypes.Color) {
				// From number...
				if (toType == DataTypes.String) {
					// ...to string
					return Number(value).toString(10);
				}
			}
		}
			
		//FNK.error("Undefined item type conversion: trying to convert [" + __value + "] from " + __fromType + " to " + __toType);
	}

	public static shouldRemoveFromNode(dataType:string):boolean {
		// Whether some object should be de-linked from node upon removal
		return false;
		// TODO: update
		//return (dataType == DataType.GRAPHIC || __dataType == DataType.IMAGE || __dataType == DataType.SOUND);
	}

	public static isNumberTrue(value:number):boolean {
		// Whether a number is bool true or false
		return value >= 1;
	}
}


/*




public serialize(__value, __fromType) {
	// Serializes an array, converting it to strings that can be saved
	if (canSave(__fromType)) {
		if (__fromType == DataType.STRING) {
			// TODO: this is ugly. redo this, need to escape semicolons
			for (var i = 0; i < __value.length; i++) {
				__value[i] = String(__value[i]).split(";").join(",");
			}
		}
		return convertDataArray(__value, __fromType, DataType.STRING).join(";");
	}
	return null;
}

public deSerialize(__value, __toType) {
	// Deserializes an array, converting a string to an array
	if (canSave(__toType)) {
		return convertDataArray(__value.split(";"), DataType.STRING, __toType);
	}
	return [];
}

public getTooltipText(__description, __value, __dataType) {
	// Based on a data type, get the tooltip string
	var txt = "";
	txt += __description + " (" + __dataType + "): "; 
	if (canSerialize(__dataType)) {
		txt += convertData(__value[0], __dataType, DataType.STRING);
	} else {
		txt += (Boolean(__value[0]) ? "[Object]": "[Null]");  
	}
	if (__value.length > 1) {
		txt += " [" + __value.length+" items]";
	}
	return txt;
}
*/


class DataTypeNumber extends DataTypes {
	public static description:string = "Number";
	public static canSerialize:boolean = true;
	public static canEdit:boolean = true;

	public getDefaultValue():number {
		return 0;
	}
}

class DataTypeString extends DataTypes {
	public static description:string = "String";
	public static canSerialize:boolean = true;
	public static canEdit:boolean = true;
	
	public getDefaultValue():string {
		return "";
	}
}

class DataTypeColor extends DataTypes {
	public static description:string = "Color";
	public static canSerialize:boolean = true;

	public getDefaultValue():number {
		return 0x000000;
	}
}

/*
class DataTypeColor extends DataType {
	public static name:string = "Number";
}

class DataTypeFilter extends DataType {
	public static name:string = "String";
}
*/

export class DataTypeNone extends DataTypes {
	public static description:string = "None";
	
	public getDefaultValue():any {
		return null;
	}
}

// Initialize data types
DataTypes.Number = new DataTypeNumber();
DataTypes.String = new DataTypeString();
DataTypes.Color = new DataTypeColor();
DataTypes.None = new DataTypeNone();
