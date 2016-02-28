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

	public add(connector:Connector, value:any[] = null) {
		this.addAt(this.ids.length, connector, value);
	}

	public addAt(position:number, connector:Connector, value:any[]) {
		this.ids.splice(position, 0, connector.id);
		if (Boolean(value)) {
			connector.setValue(value, connector.dataType);
		}
		this.connectors[connector.id] = connector;
	}

	public get(id:string):Connector {
		return this.connectors[id];
	}

	public getAt(position:number) {
		return this.connectors[this.ids[position]];
	}

	public getIdAt(position:number):string {
		return this.ids[position];
	}

	public getPosition(id:string):number {
		return this.ids.indexOf(id);
	}

	public remove(id:string) {
		let i = this.getPosition(id);
		if (i > -1) this.removeAt(i);
	}

	public removeAt(position:number) {
		let id = this.ids[position];
		this.ids.splice(position, 1);
		delete this.connectors[id];
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
	// ACCESSOR INTERFACE ---------------------------------------------------------------------------------------------

	public get length():number {
		return this.ids.length;
	}

}