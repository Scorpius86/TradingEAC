import { environment } from "src/environments/environment";

export class Settings {
    constructor(){
        this.nameService=";"
        this.urlJavaService="";
        this.urlDotnetService="";
        this.ActiveDotnet = false;
    }
    public nameService:string;
    public urlJavaService:string;
    public urlDotnetService:string;
    public ActiveDotnet:boolean;
}
