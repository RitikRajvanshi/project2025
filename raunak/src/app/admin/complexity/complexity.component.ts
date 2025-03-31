import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment.development';
import * as moment from 'moment';

@Component({
  selector: 'app-complexity',
  templateUrl: './complexity.component.html',
  styleUrls: ['./complexity.component.scss']
})
export class ComplexityComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['complexity_id', 'complexity_level', 'complexity_type', 'created_date','Action'];
  viewList: boolean = true;
  totalItems: number = 0;
  dataarray = [];
  currentdate:any;
  addformdata = {
    complexity_level:0, 
    complexity_type:'', 
    status:1,
    created_date:'',
    created_by:0
  }
  constructor(private router: Router, private http: HttpClient) {
    const user:any = localStorage.getItem('UserData');
    const userid = +  JSON.parse(user).id;
    this.addformdata.created_by = userid;
    const currentDate = moment();
    this.currentdate = moment.utc(currentDate).local().format('YYYY-MM-DD');
    this.addformdata.created_date = this.currentdate;
   }


  ngOnInit() {
    this.getcomplexitydata();
  }


  getcomplexitydata(){
    const url =environment.ADMIN_URL +environment.ADMIN.GET_COMPLEXITY_DATA;
    this.http.get<any>(url).subscribe((data: any) => {

      data = data.map((item:any)=>{
        item.editMode = false;
        const filtercreationdata = moment.utc(item.created_date).local().format('YYYY-MM-DD');
        return {...item, created_date:filtercreationdata}
      })
      // console.log(data);
      this.dataSource = new MatTableDataSource<any>(data)
      this.totalItems = data.length
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      // this.dataSource.sort.active = 'teacher_name';
      // this.dataSource.sort.direction = 'asc';
      this.dataSource.paginator = this.paginator;
      console.log(data)

  })
  }

  toggleEditMode(itemId: any, data:any) {

    const itemIndex = this.dataSource.data.findIndex(item => item.complexity_id === itemId);
    if (itemIndex !== -1) {
      this.dataSource.data[itemIndex].editMode = !this.dataSource.data[itemIndex].editMode;
      // Notify MatTableDataSource of the data change
      this.dataSource.data = [...this.dataSource.data];
    } else {
      console.error('Item with specified ID not found.');
    }
  }

  cancelEdit(itemId: any) {
    const itemIndex = this.dataSource.data.findIndex(item => item.complexity_id === itemId);
    if (itemIndex !== -1) {
      this.dataSource.data[itemIndex].editMode = false;
       // Notify MatTableDataSource of the data change
      this.dataSource.data = [...this.dataSource.data];
    }
    else {
      console.error('Item with specified ID not found.');
    }
  }

  updateComplexity(id:any,data:any){
    console.log(data, "data");
    const url = environment.ADMIN_URL + environment.ADMIN.UPDATE_COMPLEXITY;

    this.http.post<any>(url, data).subscribe((results:any)=>{
      console.log(results);
      this.ngOnInit();
    })


  }


  deleteComplexity(id:any){
    const url = environment.ADMIN_URL + environment.ADMIN.DELETE_COMPLEXITY;
    const complexityId = {
      complexity_id:+id.complexity_id
    }
    let text = 'You really want to delete it?';
    if(confirm(text)== true){
      this.http.post<any>(url, complexityId).subscribe((results:any)=>{
        alert(results[0].deactivate_complexity);
        this.ngOnInit();
      })
    }
    else{
      alert('Complexity not deleted!');
    }
  

  }

  addComplexity(){
    console.log(this.addformdata, "addComplexity");
    const url = environment.ADMIN_URL + environment.ADMIN.ADD_COMPLEXITY;

    this.http.post<any>(url, this.addformdata).subscribe((results:any)=>{
      alert(results[0].add_complexity);
      this.addformdata.complexity_level =0;
      this.addformdata.complexity_type = '';
      this.ngOnInit();

    })
  }

 


  applyFilter(filterValue: any) {
    if (filterValue) {
      this.dataSource.filter = filterValue.value.trim().toLowerCase();
    }
  }





}
