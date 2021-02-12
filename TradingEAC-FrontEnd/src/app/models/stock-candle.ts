export class StovkCandle {
    constructor(){
        this.o = new Array<number>();
        this.h = new Array<number>();
        this.l = new Array<number>();
        this.c = new Array<number>();
        this.v = new Array<number>();
        this.t = new Array<number>();
        this.s = '';
    }
    public o : Array<number>; //List of open prices for returned candles.
    public h : Array<number>; //List of high prices for returned candles.
    public l : Array<number>; //List of low prices for returned candles.
    public c : Array<number>; //List of close prices for returned candles.
    public v : Array<number>; //List of volume data for returned candles.
    public t : Array<number>; //List of timestamp for returned candles.
    public s : string;    
}
