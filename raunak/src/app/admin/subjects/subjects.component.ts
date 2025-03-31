import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment.development';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent {
  addForm:any;
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['subject_id', 'subject_name','created_date','Action'];
  viewList: boolean = true;
  totalItems: number = 0;
  currentdate:any;

  subjectData = {
    subject_name:'',
    created_date:''
  }


  constructor(private router: Router, private http: HttpClient) { 

    // Get the current date and time
    const currentDate = moment();
    // Format the date as a string if needed
    this.currentdate = moment.utc(currentDate).local().format('YYYY-MM-DD');
  this.subjectData.created_date = this.currentdate;
  }

  ngOnInit() {
   this.getsubjectdata();
   this.validation();
}

getsubjectdata(){
  const url =environment.ADMIN_URL +environment.ADMIN.GET_SUBJECTS_DATA;

  this.http.get<any>(url).subscribe((data: any) => {
    // console.log(data, "data");
    data = data.map((item:any)=>{
      item.editMode = false;
      const filteredCreatedDate = moment.utc(item.created_date).local().format('YYYY-MM-DD');
      console.log(filteredCreatedDate, "filteredCreatedDate")
      return {...item, created_date:filteredCreatedDate};
    })
    // console.log(data);
    this.dataSource = new MatTableDataSource<any>(data)
    this.totalItems = data.length
    this.dataSource.data = data;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
})
}

toggleEditMode(itemId: any, data:any) {

  const itemIndex = this.dataSource.data.findIndex(item => item.subject_id === itemId);
  if (itemIndex !== -1) {
    this.dataSource.data[itemIndex].editMode = !this.dataSource.data[itemIndex].editMode;
    // Notify MatTableDataSource of the data change
    this.dataSource.data = [...this.dataSource.data];
  } else {
    console.error('Item with specified ID not found.');
  }
}

cancelEdit(itemId: any) {
  const itemIndex = this.dataSource.data.findIndex(item => item.subject_id === itemId);
  if (itemIndex !== -1) {
    this.dataSource.data[itemIndex].editMode = false;
     // Notify MatTableDataSource of the data change
    this.dataSource.data = [...this.dataSource.data];
  }
  else {
    console.error('Item with specified ID not found.');
  }
}


addSubject(){
  const url = environment.ADMIN_URL + environment.ADMIN.ADD_SUBJECT;
  console.log(this.subjectData, "subjectData");
  this.http.post<any>(url, this.subjectData).subscribe((results:any)=>{
    alert(results[0].add_subject);
    this.subjectData ={
      subject_name:'',
      created_date:''
    }

    this.ngOnInit();

  })
}


updateSubject(id:number,data:any){
  // console.log(data, 'updateTeacher');
  const url = environment.ADMIN_URL +environment.ADMIN.UPDATE_SUBJECT;

  this.http.post<any>(url,data).subscribe((respond:any)=>{
    console.log(respond, "respond");
    this.ngOnInit();

  }) 
}


deleteSubject(data:any){
  const subjectId={
    subject_id:+ data.subject_id
  };
 const url = environment.ADMIN_URL + environment.ADMIN.DELETE_SUBJECT;
 let text = 'You really want to delete it?';
 if(confirm(text)== true){
   this.http.post<any>(url,subjectId).subscribe((results:any)=>{
     alert(results[0].deactivate_subject);
     this.ngOnInit();
   })
 }
 else{
   alert('Subject not deleted!');
 }

}



  applyFilter(filterValue: any) {
    if (filterValue) {
      this.dataSource.filter = filterValue.value.trim().toLowerCase();
    }
  }

  validation(){
    this.addForm = new FormGroup({
      subject_name:new FormControl('',[Validators.required])
    })
  }



}
