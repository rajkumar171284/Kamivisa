import {HttpClient} from '@angular/common/http';
import {Component, OnInit,ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../../components/filter-dialog/filter-dialog.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import * as moment from 'moment';

// import { Angular5Csv } from 'angular7-csv/';
enum status{
  Open='Open',
  Close='Close',
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
  close:string,
  mixer:string
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 'Open', symbol: '12min',close:'20 min',mixer:'loading'},
  {position: 2, name: 'Helium', weight: 'Close', symbol: '40 min',close:'12',mixer:'loading'},
  {position: 3, name: 'Lithium', weight:'Open', symbol: '1.1 min' ,close:'1 hr.5min',mixer:'unloading'},
  {position: 4, name: 'Beryllium', weight: 'Close', symbol:'55',close:'1.5 min',mixer:'unloading'},
  {position: 5, name: 'Boron', weight: 'Close', symbol: '30 min',close:'22',mixer:'unloading'},
  {position: 6, name: 'Carbon', weight: 'Close', symbol: '35 min',close:'10 hrs',mixer:'unloading'},
  {position: 7, name: 'Nitrogen', weight: 'Open', symbol: '15 min',close:'5hrs',mixer:'unloading'},
  {position: 8, name: 'Oxygen', weight: 'Close', symbol: '5 hrs',close:'3om min',mixer:'loading'},
  {position: 9, name: 'Fluorine', weight: 'Open', symbol:'6 hrs.10min',close:'10 min',mixer:'unloading'},
  {position: 10, name: 'Neon', weight: 'Open', symbol: '5',close:'30min',mixer:'loading'},
];


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name','MIXER(LOADING/Un-loding)', 'weight', 'symbol','close'];
  dataSource = ELEMENT_DATA;
  // @ViewChild(MatPaginator, { static: true }) pagina: MatPaginator;

  // @ViewChild(MatPaginator, { static: true }) pagina: MatPaginator;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  constructor(private _httpClient: HttpClient,public dialog: MatDialog,) {

    this.dataSource =ELEMENT_DATA.map((e,index)=>{

      var testDate = new Date();
      testDate.setDate(testDate.getDate() - index);
      e.name = moment(testDate).format('D/MM/YYYY');
      return e;
    })

  }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(FilterDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      // this.monthsData = result.data;
      // this.monthsData2 = result.data;
      console.log(`Dialog result: ${result}`);
    });
  }

  getCsv(){
    const data =ELEMENT_DATA;
    // new Angular5Csv(data, 'My Report');
    new AngularCsv(data, 'My Report');

  }

}
