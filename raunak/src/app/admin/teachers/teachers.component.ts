import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { environment } from 'src/environments/environment.development';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['teacher_id', 'teacher_name', 'teacher_emailid','subject_name', 'created_date', 'Action'];
  viewList = true;
  totalItems = 0;
  dataSource = new MatTableDataSource<any>();
  subjectData:any;
  updateForm:any;
  subjectValue:any;
  addForm:any;
  teacherData = {
  teacher_name:'',
  teacher_emailid:'',
  subject_id:0,
  created_date:''
  }
  currentdate:any;

  constructor(private router: Router, private http: HttpClient) { 
  // Get the current date and time
      const currentDate = moment();
    // Format the date as a string if needed
    this.currentdate = moment.utc(currentDate).local().format('YYYY-MM-DD');
  this.teacherData.created_date = this.currentdate;
  }

  ngOnInit() {
  
    this.getteacherdata();
    this.getsubjectsdata();
    this.validation();
    
  }

  ngAfterViewInit() {
    
      // Make property changes here
  }
  


  getteacherdata(){
    const url = environment.ADMIN_URL + environment.ADMIN.GET_TEACHERS_DATA;

    this.http.get<any>(url).subscribe((data: any) => {
    data = data.map((item:any)=>{
      item.editMode = false;
      const filteredCreatedDate = moment.utc(item.created_date).local().format('YYYY-MM-DD');
      console.log(filteredCreatedDate, "filteredCreatedDate")
      return {...item, created_date:filteredCreatedDate};
    })
      console.log(data);
      // setTimeout(() => {
        this.dataSource = new MatTableDataSource<any>(data)
        this.totalItems = data.length
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        // this.dataSource.sort.active = 'teacher_name';
        // this.dataSource.sort.direction = 'asc';
        this.dataSource.paginator = this.paginator;

      // }, 1000);
        
    })
  }


  getsubjectsdata(){
    const url = environment.ADMIN_URL +environment.ADMIN.GET_SUBJECT_DATA
    this.http.get<any>(url).subscribe((data: any)=>{
      console.log(data, "data");
      this.subjectData = data;
    });
  }

  applyFilter(filterValue: any) {
    if (filterValue) {
      this.dataSource.filter = filterValue.value.trim().toLowerCase();
    }
  }
  
  // toggleEditMode(index: number) {
  //   if (this.dataSource && index >= 0 && index < this.dataSource.data.length) {
  //     this.dataSource.data[index].editMode = !this.dataSource.data[index].editMode;
  //     this.dataSource.data = [...this.dataSource.data];

  //   } else {
  //     console.error('Invalid index or filteredvendorData is not properly initialized.');
  //   }
  // }

  toggleEditMode(itemId: any, data:any) {

    const itemIndex = this.dataSource.data.findIndex(item => item.teacher_id === itemId);
    if (itemIndex !== -1) {
      this.dataSource.data[itemIndex].editMode = !this.dataSource.data[itemIndex].editMode;
      // Notify MatTableDataSource of the data change
      this.dataSource.data = [...this.dataSource.data];
    } else {
      console.error('Item with specified ID not found.');
    }
  }

  cancelEdit(itemId: any) {
    const itemIndex = this.dataSource.data.findIndex(item => item.teacher_id === itemId);
    if (itemIndex !== -1) {
      this.dataSource.data[itemIndex].editMode = false;
       // Notify MatTableDataSource of the data change
      this.dataSource.data = [...this.dataSource.data];
    }
    else {
      console.error('Item with specified ID not found.');
    }
  }

  // subjectvalue(value:any){
  //   console.log(value, "value");
  //   this.subjectValue = + value;
  // }
  selectSubject(subjectid:any){
  this.teacherData.subject_id = + subjectid;
  }

  addTeacher(){
    const url = environment.ADMIN_URL + environment.ADMIN.ADD_TEACHER;
    // console.log(this.teacherData, "teacherdata");
    this.http.post<any>(url, this.teacherData).subscribe((results:any)=>{
      alert(results[0].add_teacher);
      this.teacherData ={
        teacher_name: '',
        teacher_emailid: '',
        subject_id: 0,
        created_date: ''
      }

      this.ngOnInit();

    })
  }

  updateTeacher(id:number,data:any){
    console.log(data, 'updateTeacher');
    const url = environment.ADMIN_URL +environment.ADMIN.UPDATE_TEACHERS_DATA;

    this.http.post<any>(url,data).subscribe((respond:any)=>{
      console.log(respond, "respond");
      this.ngOnInit();

    })

    
  }

  toggleview() {
    this.viewList = !this.viewList;
    console.log(this.viewList);
  }

  deleteTeacher(teacherdata:any){
    const url = environment.ADMIN_URL+ environment.ADMIN.DELETE_TEACHER;
    const teacherId = {
      teacher_id : teacherdata.teacher_id
    }
    let text = 'You really want to delete it?';
    if(confirm(text)== true){
      this.http.post<any>(url,teacherId).subscribe((results:any)=>{
        alert(results[0].deactivate_teacher);
        this.ngOnInit();
      })
    }
    else{
      alert('Teacher not deleted!');
    }
  
  }

  validation(){
    this.addForm = new FormGroup({
    teacher_name: new FormControl('',[Validators.required]) ,
    teacher_emailid:new FormControl('',[Validators.required]),
    subject_id :new FormControl(null,[Validators.required]),
    created_date :new FormControl('',[Validators.required])
    })
  }

  
}
