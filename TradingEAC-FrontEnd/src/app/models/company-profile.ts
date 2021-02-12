export class CompanyProfile {
    constructor(){
        this.symbol = '';
        this.country = '';
        this.currency = '';
        this.exchange = '';
        this.name = '';
        this.ticker = '';
        this.ipo = new Date();
        this.marketCapitalization = 0;
        this.shareOutstanding = 0;
        this.logo = '';
        this.phone = '';
        this.weburl = '';
        this.finnhubIndustry = '';
        this.currentPrice = 0;
        this.previousPrice = 0;
    }
    public symbol : string;
    public country : string;
    public currency : string;
    public exchange : string;
    public name : string;
    public ticker : string;
    public ipo : Date;
    public marketCapitalization : number;
    public shareOutstanding : number;
    public logo : string;
    public phone : string;
    public weburl : string;
    public finnhubIndustry : string;
    public currentPrice : number;
    public previousPrice : number;
}
