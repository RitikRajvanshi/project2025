import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  users_data: any;
  role: any;
  createForm: any;
  lastusercode:any;
  userId = {
    user_id: 0
  };

  edituserData = {
    user_id:'',
    user_code: '',
    user_name:'',
    match_commission_percentage:0,
    session_commission_percentage:0,
    mobile_share:0,
    match_share:0,
    commission_type:''
  }

  userrolename: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.validation();
    const idfromparams = this.route.snapshot.paramMap.get('id');
    if (idfromparams) {
      this.userId.user_id = +idfromparams;
      this.getUserdata();
    }

  }

  getUserdata() {
    const url = environment.ADMIN_URL + environment.ADMIN.GET_USER_DATA;
    if (this.userId.user_id !== 0) {

      this.http.post<any>(url, this.userId).subscribe((results: any) => {
        console.log(results, "getUserdata");
        this.users_data = results[0];
        this.edituserData.user_id = results[0].user_id;
        this.edituserData.user_name=results[0].user_name;
        this.edituserData.commission_type = results[0].commission_type;
        this.edituserData.match_commission_percentage = results[0].match_commission_percentage;
        this.edituserData.session_commission_percentage = results[0].session_commission_percentage;
      })
    }

  }


  edituser(){
  console.log(this.edituserData, "addusers");
  const url = environment.ADMIN_URL + environment.ADMIN.EDIT_USER;
    this.http.post(url, this.edituserData).subscribe((results:any)=>{
      console.log(results);
      alert(results.message);
      this.getUserdata();
    })

  }

  validation() {
    this.createForm = new FormGroup({
        mobile_share:new FormControl('',[Validators.required]),
        match_share:new FormControl('',[Validators.required]),
        commission_type:new FormControl('',[Validators.required]),
        match_commission_percentage:new FormControl(0,[Validators.required]),
        session_commission_percentage:new FormControl(2,[Validators.required]),
    })
  }

}
