import Node from './../nodes/Node';

/**
 * @author zeh fernando
 */
export default class Link {

	// Properties
	public inputNode:Node;
	public inputConnectorId:string;

	public outputNode:Node;
	public outputConnectorId:string;
	
	public isDelayed:boolean = false;
	public needsOutputting:boolean = false;
	
	protected previousValue:any[];
	

	// ================================================================================================================
	// CONSTRUCTOR ----------------------------------------------------------------------------------------------------

	constructor() {
	}
	
	
	// ================================================================================================================
	// PUBLIC INTERFACE -----------------------------------------------------------------------------------------------

	public setInputNode(node:Node, connectorId:string) {
		this.inputNode = node;
		this.inputConnectorId = connectorId;
	}

	public setOutputNode(node:Node, connectorId:string) {
		this.outputNode = node;
		this.outputConnectorId = connectorId;
	}

	public process() {
		let value = this.inputNode.getOutputConnectors().get(this.inputConnectorId).getValue();
		if (!this.isDelayed) {
			let vDataType = this.inputNode.getOutputConnectors().get(this.inputConnectorId).dataType;
			//console.log("      Processing normal link");
			this.outputNode.getInputConnectors().get(this.outputConnectorId).setValue(value, vDataType);
		} else {
			if (this.needsOutputting) this.doOutput();
			//console.warn("Is Delayed! Needs output = "+this.needsOutputting);
			// TODO: SPECIAL CASE for bitmaps - fix this?
			/*
			if (inputNode.getOutputType(this.inputConnectorId) == DataType.IMAGE) {
				previousValue = [];
				var prevValues:Array = inputNode.getOutputValue(this.inputConnectorId);
				var i:uint;
				var newBmp:BitmapData;
				var oldBmp:BitmapData;
				//var np:Point = new Point(0,0);
				for (i = 0; i < prevValues.length; i++) {
					oldBmp = BitmapData(prevValues[i]);
					newBmp = oldBmp.clone();
					//newBmp = new BitmapData(oldBmp.width, oldBmp.height, true, 0x00000000);
					//newBmp.copyPixels(oldBmp, newBmp.rect, np);
					previousValue.push(newBmp);
				}
				oldBmp = null;
				newBmp = null;
			} else {
				// Normal
				previousValue = inputNode.getOutputValue(this.inputConnectorId);
			}
			*/
			this.previousValue = value;
			this.needsOutputting = true;
		}
	}

	public doOutput() {
		let vDataType = this.inputNode.getOutputConnectors().get(this.inputConnectorId).dataType;

		this.needsOutputting = false;
		//console.log("==> Getting for connector of id " + this.outputConnectorId);
		//console.log("      Processing delayed link");
		this.outputNode.getInputConnectors().get(this.outputConnectorId).setValue(this.previousValue, vDataType);
	}

	public dispose() {
		this.previousValue = null;
		this.inputNode = null;
		this.outputNode = null;
		//dispatchEvent(new LinkEvent(LinkEvent.DISPOSE, this));
		// TODO: SPECIAL CASE for bitmaps - fix this?
		/*
		if (this.inputNode.getConnector(this.inputConnectorId, true).dataType == FNK.DataType.IMAGE && Boolean(previousValue)) {
			for (var i:uint = 0; i < previousValue.length; i++) {
				BitmapData(previousValue[i]).dispose();
			}
		}
		*/
	}

}

