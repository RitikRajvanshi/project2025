import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  users_data: any;
  role: any;
  createForm: any;
  lastusercode:any;
  userId = {
    user_id: 0
  };

  adduserData = {
    parent_user_id:0,
    user_code: '',
    user_name:'',
    password:'',
    parent_account_balance:0,
    account_balance:0,
    reference:'',
    match_commission_percentage:0,
    session_commission_percentage:0,
    commission_type:'',
    created_by:0,
    level:0
  }

  userrolename: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.validation();

    const idfromparams = this.route.snapshot.paramMap.get('Id');
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
        this.adduserData.created_by = +results[0].user_id;
        this.role = results[0].level - 1;
        this.adduserData.parent_user_id = +results[0].user_id;
        this.adduserData.parent_account_balance = +results[0].account_balance;
        // the user role we are created where results[0].level is the role of parent 
        this.adduserData.level = +this.role;
        this.createUsercode(this.users_data?.user_code);
      })
    }

  }

  async createUsercode(usercode: string) {
    console.log(this.role, "role");
    await this.getLastuserdata(+this.role);

    if(this.lastusercode){
      const user_code = + this.lastusercode.split('-')[1];
      if (this.lastusercode) {
        switch (this.role) {
          case 2: {
            this.userrolename = 'sba';
            break;
          }
          case 3: {
            this.userrolename = 'mna';
            break;
          }
          case 4: {
            this.userrolename = 'sma';
            break;
          }
          case 5: {
            this.userrolename = 'ma';
            break;
          }
          case 6: {
            this.userrolename = 'ag';
            break;
          }
          case 7: {
            this.userrolename = 'cl';
            break;
          }
        }
        const newUsercode = user_code + 1;
        const digitPart = ('000000' + newUsercode).slice(-6);
        this.adduserData.password = digitPart;
        const newusercode =`${this.userrolename}-${digitPart}`;
        this.adduserData.user_code = newusercode;
      }
    }
    

  }

  getLastuserdata(userrole:any){
    return new Promise((resolve,reject)=>{
      const url = environment.ADMIN_URL + environment.ADMIN.GET_LAST_USER_DATA_ACCTOLEVEL
      const Role = {
        level:+userrole
      }
  
      this.http.post(url, Role).subscribe((results:any)=>{
        console.log(results, "getLastuserdata");
        this.lastusercode = results[0].user_code;
        resolve(results);
      },
      error=>{
        console.error(error);
        reject(error);
      })
    })
  

  }

  coinsvalidation(value:any, parentcoins:any){
    if(value<0)
    {
      this.adduserData.account_balance= this.adduserData.account_balance * -1
    }
    else if(value > parentcoins){
      alert('The Coins never greater than the parents');
      this.adduserData.account_balance = 0;
    }
  }

  adduser(){
  console.log(this.adduserData, "addusers");
  const url = environment.ADMIN_URL + environment.ADMIN.ADD_USER;
    this.http.post(url, this.adduserData).subscribe((results:any)=>{
      console.log(results);
      alert(results.message);
    })

  }

  validation() {
    this.createForm = new FormGroup({
        user_code:new FormControl('',[Validators.required]),
        user_name:new FormControl('',[Validators.required]),
        account_balance:new FormControl(0,[Validators.required]),
        password:new FormControl('',[Validators.required]),
        reference:new FormControl(''),
        commission_type:new FormControl('',[Validators.required]),
        match_commission_percentage:new FormControl(0,[Validators.required]),
        session_commission_percentage:new FormControl(2,[Validators.required]),
    })
  }

}
