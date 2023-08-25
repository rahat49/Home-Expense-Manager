import { Component, OnInit } from '@angular/core';
import { MonthNavigation } from '../models/Models';
import { TableDatasourceService } from '../services/table-datasource.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit{
navigationList:MonthNavigation[];

  constructor(private datasource: TableDatasourceService){
    this.navigationList=[];
  }
  ngOnInit(): void {
    this.datasource.monthNavigationObservable.subscribe((res)=>{
      this.navigationList=res;
    })
  }

  newMonthNavigationClicked(event: any){
    let monthNavigation: MonthNavigation={
      monthYear:event.monthYear,
      monthNumber:event.monthNumber,
    };
    this.datasource.monthNavigationSelectedObservable.next(monthNavigation);
  }
  
}
