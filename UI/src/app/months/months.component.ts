import { Component, OnInit } from '@angular/core';
import { Month, MonthCalculation, MonthNavigation, Table } from '../models/Models';
import { MonthToNumberPipe } from '../Pipes/month-to-number.pipe';
import { TableDatasourceService } from '../services/table-datasource.service';

@Component({
  selector: 'months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.css']
})
export class MonthsComponent implements OnInit{
 months: Month[]=[];
 monthsToDisplay: Month[]=[];
 monthsNavigationList: MonthNavigation[]=[];

 constructor(public datasource:TableDatasourceService){ }

 ngOnInit(): void {
   this.datasource.getMonthList().subscribe((res)=>{
    for(let item of res){
      this.addMonthByNumber(item.monthYear, item.monthNum);
    }
    console.log(res);
    this.monthsToDisplay=this.months;
   });
   
   //will execute whenever a navigation is selected from side-nav
   this,this.datasource.monthNavigationSelectedObservable.subscribe((res)=>{
    this.monthsToDisplay=this.filterMonths(res.monthYear,res.monthNumber);
   });
  
 }
 filterMonths(monthYear:string,monthNumber:string):Month[]{
  let filterData:Month[]=[];

  if(monthYear==='all'){
    if(monthNumber=='all'){
      filterData=this.months;
    }else{
      //future
    }
  }else{
    if(monthNumber==='all'){
      //future
    }else{
      for(let month of this.months){
        if(
          month.monthYear===monthYear &&
          month.monthNum==monthNumber
        ){
          filterData.push(month);
        }
      }
    }

  }
  return filterData;
 }
  addNextMonth(){
    let nextYear: string='';
    let nextMonth:string='';

    if(this.months[0].monthNum==='12'){
      nextMonth='1';
      nextYear=(parseInt(this.months[0].monthYear) + 1).toString();
    }else{
      nextMonth=(parseInt(this.months[0].monthNum) + 1).toString();
      nextYear=this.months[0].monthYear;
    }
    return this.addMonthByNumber(nextYear,nextMonth);

  }

  addMonthByName(monthYear:string, monthName:string)
  {
    let monthNum=new MonthToNumberPipe().transform(monthName);
    return this.addMonthByNumber(monthYear,monthNum);
  }

  addMonthByNumber(monthYear:string, monthNumber:string){
    if(monthNumber !='0'){
      let earningsTable: Table={
        tableName: 'earnings',
        columns: ['date','name','amount'],
        rows:[],
        isSaved:false,
      };

      let expTable: Table={
        tableName:'expenditure',
        columns:['date','name','amount'],
        rows: [],
        isSaved:false,
      };
      let calcs: MonthCalculation[]=[
        {
          name:'current-savings',
          value: '0',
          isSaved:false,
        },
        {
          name:'current-expenditure',
          value: '0',
          isSaved:false,
        },
        {
          name:'current-earnings',
          value: '0',
          isSaved:false,
        },
        {
          name:'previous-savings',
          value: '0',
          isSaved:false,
        },
      ];
      let month: Month={
        monthNum:monthNumber,
        monthYear:monthYear,
        tables:[earningsTable,expTable],
        calculations:calcs,
        isSaved:false,
      };
      console.log(calcs);

      this.months.unshift(month)
      this.addMonthNavigation(monthYear,monthNumber);
      return true;
   
    }
    return false;
  }

  removMonthNavigation(monthYear:string, monthNumber:string){
    this.monthsNavigationList.forEach((value,index)=>{
      if (value.monthNumber===monthNumber&& value.monthYear===monthYear){
       this.monthsNavigationList.splice(index,1);
      }
    });
    this.datasource.monthNavigationObservable.next(this.monthsNavigationList);
  }

  deleteMonth(monthYear:string, monthName:string){
    let monthNumber=new MonthToNumberPipe().transform(monthName);
    let response=confirm('Are you sure?');
    if(response){
      this.months.forEach((month,index)=>{
        if(
          month.monthNum===monthNumber && 
          month.monthYear==monthYear
        ){
          this.months.splice(index,1);
          this.removMonthNavigation(monthYear, monthNumber);
        }
      });
    }

  }

  addMonthNavigation(monthYear:string, monthNumber:string){
    if(this.monthsNavigationList.length===0){
      let firstMonthNavigation: MonthNavigation={
        monthNumber:'all',
        monthYear:'all',
      };
      this.monthsNavigationList.unshift(firstMonthNavigation);
    }
    let monthNavigation: MonthNavigation={
      monthNumber:monthNumber,
      monthYear:monthYear,
    };
    this.monthsNavigationList.splice(1,0,monthNavigation);
    this.datasource.monthNavigationObservable.next(this.monthsNavigationList);
  }
  
}
