import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocalStorageService } from 'angular-web-storage';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { CompanyProfile } from 'src/app/models/company-profile';
import { StockSymbol } from 'src/app/models/stock-symbol';
import { StocksService } from 'src/app/services/data/stocks.service';
import { environment } from 'src/environments/environment';
import { SocketService } from 'src/app/services/socket.service';
import { LastPrice } from 'src/app/models/last-price';
import { PricesService } from 'src/app/services/data/prices.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  destroyed$ = new Subject();
  myControl = new FormControl();
  options: StockSymbol[] = [];  
  filteredOptions!: Observable<StockSymbol[]>;
  private listCompanyProfilesKey = environment.localStorageKeys.home.listCompanyProfiles;
  
  companyProfiles = new MatTableDataSource<CompanyProfile>()
  isLoading = true;

  displayedColumns: string[] = [
    'logo', 
    'symbol',
    //'ticker',
    //'exchange', 
    'name', 
    'finnhubIndustry',    
    'country', 
    'currency',   
    //'previousPrice',
    'currentPrice',
    //'ipo', 
    //'marketCapitalization', 
    //'shareOutstanding',    
    'phone', 
    'weburl',
    'action'
  ];

  constructor(
    private _stocksService : StocksService,
    private _pricesService : PricesService,
    private _localStorageService: LocalStorageService,
    private _socketService:  SocketService) { }

  ngOnInit(): void {   
    
    this._stocksService.listStocks().subscribe(stocks=>{      
      this.options = stocks;
    });
    
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => {          
          return this._filter(value);
        })
      );
      
    this.loadCompanyProfiles();

    this.getLastPrice();
  }

  ngAfterViewInit():void{
    this.companyProfiles.sort = this.sort;
    this.companyProfiles.paginator = this.paginator;
  }

  listPrices(symbols:Array<string>){
    
  }

  loadCompanyProfiles(symbol:string=''){             
    let symbols = this._localStorageService.get(this.listCompanyProfilesKey);
    symbols = symbols ?? [] ;

    if(symbol){
      symbols.push(symbol);
    }

    this._localStorageService.set(this.listCompanyProfilesKey,symbols);

    this.unsubscribeSymbols();
    if(symbols.length>0){
      this._stocksService.listCompanyProfiles(symbols).subscribe(companyProfiles=>{
        this._pricesService.listCompanyProfiles(symbols).subscribe((prices)=>{
          prices.forEach(price =>{
            let index = companyProfiles.findIndex(cp=>cp.symbol==price.symbol);
            companyProfiles[index].previousPrice = companyProfiles[index].currentPrice
            companyProfiles[index].currentPrice = price.c;
          });          
        });
        this.companyProfiles = new MatTableDataSource<CompanyProfile>(companyProfiles);
        this.companyProfiles.sort = this.sort;
        this.companyProfiles.paginator = this.paginator;
        this.subscribeSymbols();
        this.isLoading = false;
      },
      error => this.isLoading = false);
    }else{
      this.companyProfiles = new MatTableDataSource<CompanyProfile>([]);
        this.companyProfiles.sort = this.sort;
        this.companyProfiles.paginator = this.paginator;        
        this.isLoading = false;
    }
  }

  optionSelected(e:MatAutocompleteSelectedEvent){
    this.loadCompanyProfiles(e.option.value);
  }

  private _filter(value: string): StockSymbol[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => 
                                  option.symbol.toLowerCase().startsWith(filterValue) || 
                                  option.description.toLowerCase().includes(filterValue)
                              )
                              .sort((a,b)=>a.symbol > b.symbol ? 1 : -1).slice(0,20);
  }

  deleteCompany(companyProfile:CompanyProfile){
    this.unsubscribeSymbols();
    let symbols:string[] = this._localStorageService.get(this.listCompanyProfilesKey);    
    symbols = symbols.filter(s=>s!==companyProfile.symbol);
    this._localStorageService.set(this.listCompanyProfilesKey,symbols);
    this.loadCompanyProfiles();
  }

  unsubscribeSymbols(){
    let symbols:string[] = this._localStorageService.get(this.listCompanyProfilesKey);
    symbols.forEach(s=>{
      //this._socketService.send({'type':'unsubscribe', 'symbol': `BINANCE:BTCUSDT`});
      this._socketService.send({'type':'unsubscribe', 'symbol': `${s}`});
    });    
  }

  subscribeSymbols(){
    let symbols:string[] = this._localStorageService.get(this.listCompanyProfilesKey);
    symbols.forEach(s=>{      
      //this._socketService.send({'type':'subscribe', 'symbol': `BINANCE:BTCUSDT`});
      this._socketService.send({'type':'subscribe', 'symbol': `${s}`});
    });    
  }

  getLastPrice(){    
    const socket = this._socketService.connect(()=>{
      //this._socketService.send({'type':'subscribe', 'symbol': 'AAPL'});
      //this._socketService.send({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'});
      //this._socketService.send({'type':'subscribe', 'symbol': 'IC MARKETS:1'});
    }).pipe(
      takeUntil(this.destroyed$),
    );

    socket.subscribe(message => {      
      let pricesServer: LastPrice[] = message.data;
      this.companyProfiles.data.forEach( cp =>{
        if(pricesServer && pricesServer.length>0){
          //let prices=pricesServer;
          let prices = pricesServer.filter(p=>p.s==cp.symbol).sort((a,b)=> a.t > b.t ? 1 : -1); 
          if(prices.length>0){
            cp.previousPrice = cp.currentPrice;
            cp.currentPrice = prices[0].p;
          }        
        }
      });
    });
  }
}
