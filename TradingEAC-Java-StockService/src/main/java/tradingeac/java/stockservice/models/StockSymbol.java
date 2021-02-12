package tradingeac.java.stockservice.models;

public class StockSymbol {
    private String symbol;
    public void setSymbol(String value){
        symbol = value;
    }
    public String getSymbol(){
        return symbol;
    }

    private String currency;
    public void setCurrency(String value){
        currency = value;
    }
    public String getCurrency(){
        return currency;
    }

    private String description;
    public void setDescription(String value){
        description = value;
    }
    public String getDescription(){
        return description;
    }

    private String displaySymbol;
    public void setDisplaySymbol(String value){
        displaySymbol = value;
    }
    public String getDisplaySymbol(){
        return displaySymbol;
    }

    private String figi;
    public void setFigi(String value){
        figi = value;
    }
    public String getFigi(){
        return figi;
    }

    private String mic;    
    public void setMic(String value){
        mic = value;
    }
    public String getMic(){
        return mic;
    }

    private String type;
    public void setType(String value){
        type = value;
    }
    public String getType(){
        return type;
    }
}
