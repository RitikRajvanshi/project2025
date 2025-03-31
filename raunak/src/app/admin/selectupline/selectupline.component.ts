import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selectupline',
  templateUrl: './selectupline.component.html',
  styleUrls: ['./selectupline.component.scss']
})
export class SelectuplineComponent {
  userhierarchaldata:any[]=[];
  user_id:any;
  userId={
    created_by:0
  }
  Level = 0;
  own_data:any;
  own_level:any;
  selecteduserdata:any;
  constructor(private http:HttpClient, private route:ActivatedRoute, private router:Router){
  }

  ngOnInit(){
   this.userdata();
  }

  ngAfterViewInit(){
    const idfromparams = this.route.snapshot.paramMap.get('id');
    const parentLevel =  this.route.snapshot.paramMap.get('plevel');
    if(idfromparams){
     this.userId.created_by=+idfromparams;
    }
    if(parentLevel){
     this.Level = + parentLevel;
    }
     this.gethierarhchaldata(this.userId);
  }


  gethierarhchaldata(createdby: any) {
    // console.log(this.users_data[0], "createdby");
    const url = environment.ADMIN_URL + environment.ADMIN.GET_USERS_HIERARCHICAL_DATA;
    console.log(url, "URL")
    this.http.post<any>(url, createdby).subscribe((results: any) => {
      console.log(results, "gethierarhchaldata");
      this.userhierarchaldata = results.filter((data:any)=>{
       return data.level == (this.Level-1) 
      })
    })
    console.log(this.userhierarchaldata, "this.userhierarchaldata");
  }

  senduserid(event:any){
    this.user_id = +event;
    this.getUserDataById(this.user_id);
  }

  sendData(){
    this.router.navigateByUrl(`admin/create-user/${this.user_id}`);
  }

  getUserDataById(userId:any){
    const url = environment.ADMIN_URL+environment.ADMIN.GET_USER_DATA;
    const UserId ={
      user_id:+userId
    }

    this.http.post(url,UserId).subscribe((result:any)=>{
      console.log(result[0].user_id);
      this.selecteduserdata = result[0];
      console.log(this.selecteduserdata);

    })

  }

  userdata(){
    // if(localStorage.getItem('user_data')){
      const user_data = localStorage.getItem('user_data');
      const url = environment.ADMIN_URL + environment.ADMIN.GET_USER_DATA;
      if(user_data){
      const UserId ={
        user_id:+ user_data
      }
      this.http.post<any>(url,UserId).subscribe((results:any)=>{
        console.log(results, "ownData");
        this.own_data = results[0];
      this.own_level = results[0].level; 
      })
    }
    // }
  }

}
