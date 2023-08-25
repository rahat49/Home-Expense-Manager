import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
@Output() sideNavToggled=new EventEmitter<boolean>();
 menuButtonStatus: boolean=true;

 constructor(){}

 toggleSideNav(){
  this.menuButtonStatus=!this.menuButtonStatus;
  this.sideNavToggled.emit(this.menuButtonStatus);
 }
}
