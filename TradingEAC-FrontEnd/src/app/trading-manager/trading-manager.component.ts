import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-trading-manager',
  templateUrl: './trading-manager.component.html',
  styleUrls: ['./trading-manager.component.scss']
})
export class TradingManagerComponent implements OnInit {

  @ViewChild('sidenav')  sidenav!: MatSidenav;

  version = VERSION;
  mode : MatDrawerMode = 'side'
  opened = true;
  layoutGap = '64';
  fixedInViewport = true;

  constructor(private bpo: BreakpointObserver) { }

  ngOnInit(): void {     
   const breakpoints = (Object as any).values(Breakpoints)
    this.bpo.observe(breakpoints)
    .pipe(map(bst => bst.matches))
    .subscribe(matched => {      
      this.determineSidenavMode();
      this.determineLayoutGap();
    });
  }

  private determineSidenavMode(): void {
    if (
        this.isExtraSmallDevice() ||
        this.isSmallDevice()
    ) {
        this.fixedInViewport = false;
        this.mode = 'over';
        this.opened = false;
        return;
    }

    this.fixedInViewport = true;
    this.mode = 'side';
    if(this.sidenav){
    this.sidenav.open();
    }
}

private determineLayoutGap(): void {
    if (this.isExtraSmallDevice() || this.isSmallDevice()) {
        this.layoutGap = '0';
        return;
    }

    this.layoutGap = '64';
}

  public isExtraSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.XSmall);
  }

  public isSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.Small)
  }

}

interface BreakpointKey {  
  key: string;
}