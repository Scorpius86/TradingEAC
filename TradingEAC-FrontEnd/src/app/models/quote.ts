export class Quote {
    constructor(){
        this.symbol = "";
        this.o = 0;
        this.h = 0;
        this.i = 0;
        this.c = 0;
        this.pc = 0;
        this.t = 0;
    }
    public symbol : string;
    public o : number; //Open price of the day
    public h : number; //High price of the day
    public i : number; //Low price of the day
    public c : number; //Current price
    public pc : number; //Previous close price
    public t : number;
}
