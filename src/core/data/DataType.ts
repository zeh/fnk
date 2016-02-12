/**
 * @author zeh fernando
 */
export default class DataType {

	// TODO: maybe move this to separate classes?
	static NUMBER:string = "Number";
	static STRING:string = "String";
	static COLOR:string = "Color";
	//public GRAPHIC = "Graphic"; // TODO: review this
	//public IMAGE = "Image"; // TODO: review this
	//public SOUND = "Sound"; // TODO: review this
	//public FILTER = "Filter"; // TODO: review this
	static NULL:string = "None";

	// ================================================================================================================
	// STATIC INTERFACE -----------------------------------------------------------------------------------------------

	public static getDefaultValue(type:string):any {
		switch (type) {
			case DataType.NUMBER:
				return 0;
			case DataType.STRING:
				return "";
			case DataType.COLOR:
				return 0;
	//		case GRAPHIC:
	//		case IMAGE:
	//		case SOUND:
	//		case FILTER:
			case DataType.NULL:
				return null;
		}
		
		return null;
	}
	
	public static convertDataArray(value:any[], fromType:string, toType:string):any[] {
		// Converts an entire array of data from one type to the other
		let newValue:any[] = [];
		for (let i = 0; i < value.length; i++) {
			newValue[i] = this.convertData(value[i], fromType, toType);
		}
		return newValue;
	}

	public static convertData(value:any, fromType:string, toType:string):any {
		// Converts one item of data from one type to the other
		let tempN:number;
		if (fromType == toType) {
			// Same type, no need for conversion
			return value;
		} else {
			// Different types
			if (fromType == DataType.STRING) {
				// From string...
				if (toType == DataType.NUMBER || toType == DataType.COLOR) {
					// ...to number
					tempN = parseFloat(String(value));
					if (isNaN(tempN)) tempN = 0;
					return tempN;
				} else if (toType == DataType.COLOR) {
					// ...to color
					tempN = parseFloat(String(value));
					if (isNaN(tempN)) tempN = 0;
					return tempN;
				}
			} else if (fromType == DataType.NUMBER || fromType == DataType.COLOR) {
				// From number...
				if (toType == DataType.STRING) {
					// ...to string
					return Number(value).toString(10);
				}
			}
		}
			
		//FNK.error("Undefined item type conversion: trying to convert [" + __value + "] from " + __fromType + " to " + __toType);
	}

	public static canSerialize(dataType:string):boolean {
		// Whether this data can be serialized (i.e. saved on the XML)
		return (dataType == DataType.NUMBER || dataType == DataType.STRING || dataType == DataType.COLOR);
	}

	public static canEdit(dataType:string):boolean {
		// Whether it can be directly edited
		return (dataType == DataType.NUMBER || dataType == DataType.STRING);
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