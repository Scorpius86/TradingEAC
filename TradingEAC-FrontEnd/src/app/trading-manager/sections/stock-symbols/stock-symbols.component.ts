import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StockSymbol } from 'src/app/models/stock-symbol';
import { StocksService } from 'src/app/services/data/stocks.service';

@Component({
  selector: 'app-stock-symbols',
  templateUrl: './stock-symbols.component.html',
  styleUrls: ['./stock-symbols.component.scss']
})
export class StockSymbolsComponent implements OnInit,AfterViewInit  {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  stockSymbols = new MatTableDataSource<StockSymbol>()
  isLoading = true;

  displayedColumns: string[] = [
    'currency', 
    'description', 
    'displaySymbol', 
    'figi',
    'mic', 
    'symbol', 
    'type'
  ];

  constructor(private _stocksService : StocksService) { }

  ngOnInit(): void {    
    this.listStocks();
  }

  ngAfterViewInit():void{
    this.stockSymbols.sort = this.sort;
    this.stockSymbols.paginator = this.paginator;
  }

  listStocks(){
    this._stocksService.listStocks().subscribe(s=>{
      this.stockSymbols = new MatTableDataSource<StockSymbol>(s);
      this.stockSymbols.sort = this.sort;
      this.stockSymbols.paginator = this.paginator;
      this.isLoading = false;
    },
    error => this.isLoading = false);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.stockSymbols.filter = filterValue.trim().toLowerCase();

    if (this.stockSymbols.paginator) {
      this.stockSymbols.paginator.firstPage();
    }
  }
}
