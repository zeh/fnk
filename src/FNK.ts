class FNK {
	public static VERSION = "0.1.0";
	
	private timeStarted:number;

    constructor() {
		this.timeStarted = (new Date()).valueOf();
	}

    public getTimer():number {
        return new Date().valueOf() - this.timeStarted;
    }
};

var fnk = new FNK();
console.log("FBK started; time is " + fnk.getTimer());
