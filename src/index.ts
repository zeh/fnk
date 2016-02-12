/**
 * @author zeh fernando
 */

import FNK from './FNK'
import Patch from './core/graph/Patch';
import Link from './core/graph/Link';
import Node from './core/graph/Node';
import DataType from './core/data/DataType';

import NumberIONode from './lib/nodes/number/NumberIONode';

console.log("FNK started; time is " + FNK.getTimer() + " (started at " + FNK.TIME_STARTED + ")");
console.log("Patch is " + Patch);


// Tentative low-level API for the code version of the language

/*
Current patch being simulated:

.-----.      .-----.
|  2  |      |  1  |  (NumberIONodes)
'--.--'      '--.--'
   |            |
   '-----. .----'
	   .-'-'-.
	   |  -  | (NumberSubtract)
	   '--.--'
		  |
		  |            .------------------------.
	   .--'--.      .--'--.                     |
	   |  3  |      |  1  | (NumberIONodes)     |
	   '--.--'      '--.--'                     | --> This link is delayed
		  |            |                        |
		  '-----. .----'                        |
			  .-'-'-.                           |
			  |  +  | (NumberAdd)               |
			  '--.--'                           |
				 |                              |
				 |                              |
			  .--'--.                           |
			  |  2  | (NumberIONode)            |
			  '-----'                           |
				 |                              |
				 '------------------------------'
*/

console.log("===================>>>> Creating patch...");

let patch = new Patch();


// Main nodes
let nodea = new NumberIONode();
nodea.getInputConnectors().getConnectorAt(0).setValue([2], DataType.NUMBER);
patch.addNode(nodea);

let nodeb = new NumberIONode();
nodeb.getInputConnectors().getConnectorAt(0).setValue([1], DataType.NUMBER);
patch.addNode(nodeb);

/*

// Operation
let pnode = new NumberSubtract();
patch.addNode(pnode);

// Result
let resultnode = new NumberIONode();
patch.addNode(resultnode);

// Links: before operation
let linka = new Link();
linka.setInputNode(nodea, nodea.getOutputConnectorIdAt(0));
linka.setOutputNode(pnode, pnode.getInputConnectorIdAt(0));
patch.addLink(linka);

let linkb = new Link();
linkb.setInputNode(nodeb, nodeb.getOutputConnectorIdAt(0));
linkb.setOutputNode(pnode, pnode.getInputConnectorIdAt(1));
patch.addLink(linkb);

// Links: after operation

let linkresult = new Link();
linkresult.setInputNode(pnode, pnode.getOutputConnectorIdAt(0));
linkresult.setOutputNode(resultnode, resultnode.getInputConnectorIdAt(0));
patch.addLink(linkresult);

// Subtraction
let nodec = new NumberIONode();
nodec.getInputConnectorAt(0).setValue([1], DataType.NUMBER);
patch.addNode(nodec);

let snode = new NumberAdd();
patch.addNode(snode);

let noded = new NumberIONode();
patch.addNode(noded);

let linkc = new Link();
linkc.setInputNode(resultnode, resultnode.getOutputConnectorIdAt(0));
linkc.setOutputNode(snode, snode.getInputConnectorIdAt(0));
patch.addLink(linkc);

let linkd = new Link();
linkd.setInputNode(nodec, nodec.getOutputConnectorIdAt(0));
linkd.setOutputNode(snode, snode.getInputConnectorIdAt(1));
patch.addLink(linkd);

let linke = new Link();
linke.setInputNode(snode, snode.getOutputConnectorIdAt(0));
linke.setOutputNode(noded, noded.getInputConnectorIdAt(0));
patch.addLink(linke);

let linkloop = new Link();
linkloop.delayed = true;
linkloop.setInputNode(noded, noded.getOutputConnectorIdAt(0));
linkloop.setOutputNode(nodec, nodec.getInputConnectorIdAt(0));
patch.addLink(linkloop);

processAndReport = function() {
	console.log("===================>>>> Processing patch...");

	patch.process();

	console.log("===================>>>> All done.");

	console.log("==== Node a: " + nodea + " = " + nodea.getOutputConnectorAt(0).getValue());
	console.log("==== Node b: " + nodeb + " = " + nodeb.getOutputConnectorAt(0).getValue());
	console.log("==== Node subtract: " + pnode + " = " + pnode.getOutputConnectorAt(0).getValue());
	console.log("==== Node result: " + resultnode + " = " + resultnode.getOutputConnectorAt(0).getValue());
	console.log("==== Node c: " + nodec + " = " + nodec.getOutputConnectorAt(0).getValue());
	console.log("==== Node add: " + snode + " = " + snode.getOutputConnectorAt(0).getValue());
	console.log("==== Node d: " + noded + " = " + noded.getOutputConnectorAt(0).getValue());
};

processAndReport();

*/