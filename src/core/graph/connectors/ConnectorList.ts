import Connector from "./Connector";

/**
 * @author zeh fernando
 */
export default class ConnectorList {

	// Properties
	private connectors:{[key:string]:Connector} = {};
	private ids:string[] = [];

	
	// ================================================================================================================
	// CONSTRUCTOR ----------------------------------------------------------------------------------------------------

	constructor() {
	}


	// ================================================================================================================
	// PUBLIC INTERFACE -----------------------------------------------------------------------------------------------
	
	public addConnector(connector:Connector, value:any[] = null) {
		this.addConnectorAt(this.ids.length, connector, value);
	}
	
	public removeConnector(id:string) {
		let i = this.getConnectorPosition(id);
		if (i > -1) this.removeConnectorAt(i);
	}

	public getConnector(id:string):Connector {
		return this.connectors[id];
	}

	public getConnectorAt(position:number) {
		return this.connectors[this.ids[position]];
	}

	public getNumConnectors():number {
		return this.ids.length;
	}

	public getHasChangedAny():boolean {
		for (let id in this.connectors) {
			if (this.connectors[id].hasChanged) return true;
		}
		return false;
	}

	public resetChangeFlag() {
		for (let id in this.connectors) {
			this.connectors[id].resetChangeFlag();
		}
	}

	
	// ================================================================================================================
	// PRIVATE INTERFACE ----------------------------------------------------------------------------------------------

	private addConnectorAt(position:number, connector:Connector, value:any[]) {
		this.ids.splice(position, 0, connector.id);
		if (Boolean(value)) {
			connector.setValue(value, connector.dataType);
		}
		this.connectors[connector.id] = connector;
	}
	
	private addConnectorAfter(id:string, connector:Connector, value:any[]) {
		let i = this.getConnectorPosition(id);
		if (i < 0) i = this.ids.length-1;
		this.addConnectorAt(i + 1, connector, value);
	}
	
	private removeConnectorAt(position:number) {
		var id = this.ids[position];
		this.ids.splice(position, 1);
		delete this.connectors[id];
	}

	private getConnectorIdAt(position:number):string {
		return this.ids[position];
	}

	private getConnectorPosition(id:string):number {
		return this.ids.indexOf(id);
	}

	private getConnectorId(position:number):string {
		return this.ids[position];
	}
}