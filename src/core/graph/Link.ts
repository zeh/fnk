import Node from './Node';

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
		if (!this.isDelayed) {
			this.doOutput();
		} else {
			//FNK.warn("Is Delayed! Needs output = "+this.needsOutputting);
			// This is not needed?? Because the patch does it itself...
			//if (this.needsOutputting) this.doOutput();
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
			/*
			//this.previousValue = this.inputNode.getOutputValue(this.inputConnectorId);
			this.needsOutputting = true;
			// TODO: deep copy instead? 
			*/
		}
	}

	public dispose() {
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


	// ================================================================================================================
	// PRIVATE INTERFACE ----------------------------------------------------------------------------------------------

	public doOutput() {
		//let vValue = this.inputNode.getOutputConnector(this.inputConnectorId).getValue();
		//let vDataType = this.inputNode.getOutputConnector(this.inputConnectorId).dataType;

		//this.needsOutputting = false;
		//this.outputNode.getInputConnector(this.outputConnectorId).setValue(vValue, vDataType);
	}
	
}

