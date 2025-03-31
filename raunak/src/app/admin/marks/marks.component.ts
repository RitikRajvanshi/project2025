import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment.development';
import * as moment from 'moment';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class MarksComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['marks_id', 'marks', 'created_date','Action'];
  viewList: boolean = true;
  totalItems: number = 0;

  dataarray = [];
  currentDate:any;

 marksData ={
  marks:null,
  created_date:''
 }


  constructor(private router: Router, private http: HttpClient) { 

    this.currentDate = moment.utc().local().format('YYYY-MM-DD');
    this.marksData.created_date = this.currentDate;
  }


  ngOnInit() {
     this.getmarksdata();
  }


  getmarksdata(){
    const url =environment.ADMIN_URL +environment.ADMIN.GET_MARKS_DATA;
    this.http.get<any>(url).subscribe((data: any) => {

      data = data.map((item:any)=>{
        item.editMode = false;
        const filteredCreatedDate = moment.utc(item.created_date).local().format('YYYY-MM-DD');
        console.log(filteredCreatedDate, "filteredCreatedDate")
        return {...item, created_date:filteredCreatedDate};
      })
      // console.log(data);
      this.dataSource = new MatTableDataSource<any>(data)
      this.totalItems = data.length;
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      // this.dataSource.sort.active = 'teacher_name';
      // this.dataSource.sort.direction = 'asc';
      this.dataSource.paginator = this.paginator;
      console.log(data)
  })
  }

  applyFilter(filterValue: any) {
    if (filterValue) {
      this.dataSource.filter = filterValue.value.trim().toLowerCase();
    }
  }

  toggleEditMode(marksId: any, data:any) {

    const itemIndex = this.dataSource.data.findIndex(item => item.marks_id === marksId);
    if (itemIndex !== -1) {
      this.dataSource.data[itemIndex].editMode = !this.dataSource.data[itemIndex].editMode;
      // Notify MatTableDataSource of the data change
      this.dataSource.data = [...this.dataSource.data];
    } else {
      console.error('Item with specified ID not found.');
    }
  }

  cancelEdit(marksId: any) {
    const itemIndex = this.dataSource.data.findIndex(item => item.marks_id === marksId);
    if (itemIndex !== -1) {
      this.dataSource.data[itemIndex].editMode = false;
       // Notify MatTableDataSource of the data change
      this.dataSource.data = [...this.dataSource.data];
    }
    else {
      console.error('Item with specified ID not found.');
    }
  }


  updateMarks(id:any,data:any){
    const url = environment.ADMIN_URL + environment.ADMIN.UPDATE_MARKS;
    console.log(data, "data");
    this.http.post<any>(url, data).subscribe((results:any)=>{
      console.log(results, "updatemarks");
      this.ngOnInit();
    })

  }


  deleteMarks(marksdata:any){
    const url = environment.ADMIN_URL+ environment.ADMIN.DELETE_MARKS;
    const teacherId = {
      marks_id : + marksdata.marks_id
    }
    let text = 'You really want to delete it?';
    if(confirm(text)== true){
      this.http.post<any>(url,teacherId).subscribe((results:any)=>{
        alert(results[0].deactivate_marks);
        this.ngOnInit();
      })
    }
    else{
      alert('Marks not deleted!');
    }
  
  }

  addMarks(){
    const url = environment.ADMIN_URL + environment.ADMIN.ADD_MARKS;

    this.http.post<any>(url,this.marksData).subscribe((results:any)=>{
      alert(results[0].add_marks);
      this.marksData ={
        marks:null,
        created_date:''
      }

      this.ngOnInit();
    })
  }


}
