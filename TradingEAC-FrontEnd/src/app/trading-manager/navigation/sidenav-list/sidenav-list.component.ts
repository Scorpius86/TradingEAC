import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Input() public fixedInViewport!: boolean;
  @Output() sidenavClose = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  public onSidenavClose = () => {
    if(!this.fixedInViewport){
    this.sidenavClose.emit();
    }
  }

}
