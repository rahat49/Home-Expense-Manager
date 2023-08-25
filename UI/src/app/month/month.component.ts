import { Component, Input, OnInit } from '@angular/core';
import { Month } from '../models/Models';
import { TableDatasourceService } from '../services/table-datasource.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit{
@Input () month: Month;

  constructor(private datasource: TableDatasourceService){
    this.month={
      monthNum: '',
      monthYear: '',
      tables:[],
      calculations:[],
      isSaved:false,
    };
  }
  ngOnInit(): void {
    this.datasource.previousSavingsObservable.subscribe((res)=>
    {
      if(this.month.monthYear===res.monthYear &&
        this.month.monthNum===res.monthNumber) {
          this.setCalculation('previous-savings',res.sum)
        }
    });
    this.datasource.currentSavingsRequestObservable.subscribe((res)=>{
      if(this.month.monthYear===res.monthYear &&
        this.month.monthNum===res.monthNumber){
          this.currentSavingsUpdated();
        }
    });

    //this month will send the request, to get the savings value of previous month
    let pd=this.getPreviousDate(this.month.monthYear,this.month.monthNum);
    this.datasource.currentSavingsRequestObservable.next({
      monthYear:pd.monthYear,
      monthNumber:pd.monthNumber,
    });
  }

  

  sumUpdated(tableName:string, sum: number){
    if(tableName==='earnings'){
      this.setCalculation('current-earnings',sum.toString());
    }else{
      this.setCalculation('current-expenditure',sum.toString());
    }
    this.setCurrentSaving();
  }
// -------------------------------CALCULATIONS
  setCalculation(name:string, sum:string){
    this.month.calculations.forEach((value,index)=>{
      if(value.name===name){
        value.value=sum;
      }
    });
  }

  getCalculation(name:string):number{
    let sum='0';
    this.month.calculations.forEach((value,index)=>{
      if(value.name===name){
       sum=value.value;
      }
    });
    return parseInt(sum);
  }

  setCurrentSaving(){
    let ps=this.getCalculation('previous-savings');
    let ce=this.getCalculation('current-earnings');
    let cx=this.getCalculation('current-expenditure');

    let cs= ps + ce - cx;
    this.month.calculations.forEach((value,index) => {
      if(value.name==='current-savings'){
        value.value=cs.toString();
      }
    });
    this.currentSavingsUpdated();
  }

  //this will send the valu of current savings into previous saving obserable
  //so that next month can take it as its previous savings.
  currentSavingsUpdated(){
    let nd =this.getnextDate(this.month.monthYear, this.month.monthNum);
    this.datasource.previousSavingsObservable.next({
      monthYear:nd.monthYear,
      monthNumber:nd.monthNumber,
      sum: this.getCalculation('current-savings').toString(),
    });

  }
  getPreviousDate(
    monthYear:string,
    monthNum:string
    ):{monthYear:string;monthNumber:string}{
      let temp=parseInt(monthNum);
      let pm=temp==1?'12':(temp-1).toString();

      let py=pm==='12'?(parseInt(monthYear)-1).toString():monthYear;
      return {monthYear:py, monthNumber:pm};
    }
  getnextDate(
    monthYear:string,
    monthNum:string
    ):{monthYear:string;monthNumber:string}{
      let temp=parseInt(monthNum);
      let nm=temp==12?'1':(temp+1).toString();

      let ny=nm==='1'?(parseInt(monthYear)+1).toString():monthYear;
      return {monthYear:ny, monthNumber:nm};
    }
}
