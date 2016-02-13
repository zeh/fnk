import FNK from './../../FNK';
import Node from './Node';
import Link from './Link';

/**
 * @author zeh fernando
 */
export default class Patch {

	// Properties
	public lastProcessTime:number = 0;			// int (ms)
	public currentTime:number = 0;				// int (ms)
	public currentFrame:number = 0;				// int (frames)
	
	public nodes:Node[] = [];
	public links:Link[] = [];


	// ================================================================================================================
	// CONSTRUCTOR ----------------------------------------------------------------------------------------------------

	constructor() {
		
	}


	// ================================================================================================================
	// PUBLIC INTERFACE -----------------------------------------------------------------------------------------------
	
	public addNode(node:Node) {
		this.nodes.push(node);
		node.patch = this;
	}
	
	public removeNode(node:Node) {
		let idx = this.nodes.indexOf(node);
		if (idx > -1) {
			this.nodes.splice(idx, 1);
			node.patch = undefined;
		}
	}

	public addLink(link:Link) {
		this.links.push(link);
	}
	
	public removeLink(link:Link) {
		let idx = this.links.indexOf(link);
		if (idx > -1) {
			this.links.splice(idx, 1);
		}
	}
	
	public process() {
		// Process the patch. This is where the magic happens
		this.currentTime = FNK.getTimer();
		this.currentFrame++;

		console.log("Processing patch; currentTime = " + this.currentTime + ", frame = " + this.currentFrame);

		let i:number, j:number;
		
		let canProcess:boolean;
		let tNode:Node;
		
		// Starts a node cycle
		i = 0;
		let cycles = 0; // TODO: sanity check; remove this
		while (i < this.nodes.length && cycles < 100) {
			console.log("  Processing node " + i + "/" + this.nodes.length + ": " + this.nodes[i] + " (" + cycles + " cycles done so far)");

			cycles++;

			// Tries to process a given node
			tNode = this.nodes[i];

			canProcess = true;

			for (j = 0; j < this.links.length; j++) {
				// TODO: optimize this with a dictionary lookup for nodes -> links?
				if (this.links[j].outputNode == tNode && this.nodes.indexOf(this.links[j].inputNode) > i) {
					if (this.links[j].isDelayed) {
						if (this.links[j].needsOutputting) {
							console.log("    Processing delayed link");
							this.links[j].doOutput();
						}
					} else {
						canProcess = false;
						break;
					}
				}
			}
			
			if (canProcess) {
				// Can process, do it and continue					
				// Process all related links first
				//console.log("    Can process");
				// TODO - only process nodes that need processing? Because the events have been removed from the actionscript version, it's brute-forcing all updates
				for (j = 0; j < this.links.length; j++) {
					if (this.links[j].outputNode == tNode) {
						//console.log("      Processing input link " + j);
						this.links[j].process();
					}
				}

				tNode.process();
				
				i++;
			} else {
				// Can't process, move to end of list
				console.warn("    Cannot process node ["+i+"] ["+tNode+"] yet -- shouldn't be here, moving to end of list");
				cycles++;

				this.nodes.splice(i, 1);
				this.nodes.push(tNode);
			}
		}

		this.lastProcessTime = FNK.getTimer() - this.currentTime;

		console.log("Done; spent " + this.lastProcessTime + "ms processing the patch.");
		
		if (cycles >= 100) console.error("Error: timeout after "+cycles+" cycles");
	}
	
	public isNodeConnected(node:Node, connectorId:String, connectorIsOutput:boolean):boolean {
		for (let i = 0; i < this.links.length; i++) {
			if (connectorIsOutput) {
				if (connectorId == this.links[i].inputConnectorId && node == this.links[i].inputNode) return true;
			} else {
				if (connectorId == this.links[i].outputConnectorId && node == this.links[i].outputNode) return true;
			}
		}
		return false;
	}
}
