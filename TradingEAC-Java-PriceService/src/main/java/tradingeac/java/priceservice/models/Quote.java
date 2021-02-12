package tradingeac.java.priceservice.models;

import lombok.Getter;
import lombok.Setter;

public class Quote {
    private String symbol;
    public void setSymbol(String value){
        symbol = value;
    }
    public String getSymbol(){
        return symbol;
    }

    private double c;
    public void setC(double value){
        c = value;
    }
    public double getC(){
        return c;
    }

    private double h;
    public void setH(double value){
        h = value;
    }
    public double getH(){
        return h;
    }

    private double i;
    public void setI(double value){
        i = value;
    }
    public double getI(){
        return i;
    }

    private double o;
    public void setO(double value){
        o = value;
    }
    public double getO(){
        return o;
    }

    private double pc;
    public void setPC(double value){
        pc = value;
    }
    public double getPC(){
        return pc;
    }

    private long t;
    public void setT(long value){
        t = value;
    }
    public long getT(){
        return t;
    }

}
