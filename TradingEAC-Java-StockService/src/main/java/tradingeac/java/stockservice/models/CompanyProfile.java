package tradingeac.java.stockservice.models;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

public class CompanyProfile {
    private String symbol;
    public void setSymbol(String value){
        symbol = value;
    }
    public String getSymbol(){
        return symbol;
    }
    
    @Getter @Setter private String country;
    @Getter @Setter private String currency;
    @Getter @Setter private String exchange;
    @Getter @Setter private String name;
    @Getter @Setter private String ticker;
    @Getter @Setter private Date ipo;
    @Getter @Setter private double marketCapitalization;
    @Getter @Setter private double shareOutstanding;
    @Getter @Setter private String logo;
    @Getter @Setter private String phone;
    @Getter @Setter private String weburl;
    @Getter @Setter private String finnhubIndustry;
}
