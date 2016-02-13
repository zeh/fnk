/**
 * @author zeh fernando
 */

import FNK from './FNK'
import Patch from './core/graph/Patch';
import Link from './core/graph/Link';
import Node from './core/graph/Node';
import DataType from './core/data/DataType';

import NumberIONode from './lib/nodes/number/NumberIONode';
import NumberSubtract from './lib/nodes/number/NumberSubtract';
import NumberAdd from './lib/nodes/number/NumberAdd';

console.log("FNK started; time is " + FNK.getTimer() + " (started at " + FNK.TIME_STARTED + ")");


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

// Operation
let pnode = new NumberSubtract();
patch.addNode(pnode);

// Result
let resultnode = new NumberIONode();
patch.addNode(resultnode);

// Links: before operation
let linka = new Link();
linka.setInputNode(nodea, nodea.getOutputConnectors().getConnectorIdAt(0));
linka.setOutputNode(pnode, pnode.getInputConnectors().getConnectorIdAt(0));
patch.addLink(linka);

let linkb = new Link();
linkb.setInputNode(nodeb, nodeb.getOutputConnectors().getConnectorIdAt(0));
linkb.setOutputNode(pnode, pnode.getInputConnectors().getConnectorIdAt(1));
patch.addLink(linkb);

// Links: after operation

let linkresult = new Link();
linkresult.setInputNode(pnode, pnode.getOutputConnectors().getConnectorIdAt(0));
linkresult.setOutputNode(resultnode, resultnode.getInputConnectors().getConnectorIdAt(0));
patch.addLink(linkresult);

// Addition
let nodec = new NumberIONode();
nodec.getInputConnectors().getConnectorAt(0).setValue([1], DataType.NUMBER);
patch.addNode(nodec);

let snode = new NumberAdd();
patch.addNode(snode);

let noded = new NumberIONode();
patch.addNode(noded);

let linkc = new Link();
linkc.setInputNode(resultnode, resultnode.getOutputConnectors().getConnectorIdAt(0));
linkc.setOutputNode(snode, snode.getInputConnectors().getConnectorIdAt(0));
patch.addLink(linkc);

let linkd = new Link();
linkd.setInputNode(nodec, nodec.getOutputConnectors().getConnectorIdAt(0));
linkd.setOutputNode(snode, snode.getInputConnectors().getConnectorIdAt(1));
patch.addLink(linkd);

let linke = new Link();
linke.setInputNode(snode, snode.getOutputConnectors().getConnectorIdAt(0));
linke.setOutputNode(noded, noded.getInputConnectors().getConnectorIdAt(0));
patch.addLink(linke);

let linkloop = new Link();
linkloop.isDelayed = true;
linkloop.setInputNode(noded, noded.getOutputConnectors().getConnectorIdAt(0));
linkloop.setOutputNode(nodec, nodec.getInputConnectors().getConnectorIdAt(0));
patch.addLink(linkloop);

function processAndReport() {
	console.log("===================>>>> Processing patch...");

	patch.process();

	console.log("===================>>>> All done.");

	/*
	console.log("==== Node a:        " + nodea + " = " + nodea.getOutputConnectors().getConnectorAt(0).getValue());
	console.log("==== Node b:        " + nodeb + " = " + nodeb.getOutputConnectors().getConnectorAt(0).getValue());
	console.log("==== Node subtract: " + pnode + " = " + pnode.getOutputConnectors().getConnectorAt(0).getValue());
	console.log("==== Node result:   " + resultnode + " = " + resultnode.getOutputConnectors().getConnectorAt(0).getValue());
	console.log("==== Node c:        " + nodec + " = " + nodec.getOutputConnectors().getConnectorAt(0).getValue());
	console.log("==== Node add:      " + snode + " = " + snode.getOutputConnectors().getConnectorAt(0).getValue());
	console.log("==== Node d:        " + noded + " = " + noded.getOutputConnectors().getConnectorAt(0).getValue());
	*/
	
	console.log(".-----.      .-----.                                                                    ");
	console.log("|  "+nodea.getOutputConnectors().getConnectorAt(0).getValue()+"  |      |  "+nodeb.getOutputConnectors().getConnectorAt(0).getValue()+"  |  (NumberIONodes)                                                   ");
	console.log("'--.--'      '--.--'                                                                    ");
	console.log("   |            |                                                                       ");
	console.log("   '-----. .----'                                                                       ");
	console.log("       .-'-'-.                                                                          ");
	console.log("       |  -  | (NumberSubtract)                                                         ");
	console.log("       '--.--'                                                                          ");
	console.log("          | "+pnode.getOutputConnectors().getConnectorAt(0).getValue()+"                                                                             ");
	console.log("          |            .------------------------.                                       ");
	console.log("       .--'--.      .--'--.                     |                                       ");
	console.log("       |  "+resultnode.getOutputConnectors().getConnectorAt(0).getValue()+"  |      |  "+nodec.getOutputConnectors().getConnectorAt(0).getValue()+"  | (NumberIONodes)     |                                       ");
	console.log("       '--.--'      '--.--'                     | --> This link is delayed              ");
	console.log("          |            |                        |                                       ");
	console.log("          '-----. .----'                        |                                       ");
	console.log("              .-'-'-.                           |                                       ");
	console.log("              |  +  | (NumberAdd)               |                                       ");
	console.log("              '--.--'                           |                                       ");
	console.log("                 | "+snode.getOutputConnectors().getConnectorAt(0).getValue()+"                            |                                       ");
	console.log("                 |                              |                                       ");
	console.log("              .--'--.                           |                                       ");
	console.log("              |  "+noded.getOutputConnectors().getConnectorAt(0).getValue()+"  | (NumberIONode)            |                                       ");
	console.log("              '-----'                           |                                       ");
	console.log("                 |                              |                                       ");
	console.log("                 '------------------------------'                                       ");
};

processAndReport();
processAndReport();
