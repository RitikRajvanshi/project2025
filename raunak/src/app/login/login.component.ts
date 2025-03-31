import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: any;

  constructor(private router: Router, private http: HttpClient) { }


  ngOnInit(): void {
    this.validation();
  }

  validation() {
    this.loginForm = new FormGroup({
      user_name: new FormControl('', [Validators.required]),
      user_password: new FormControl('', [Validators.required])
    })
  }


  userLogin(userdata: Object) {
    console.log(userdata)
    const url = environment.LOGIN_URL + environment.LOGIN.USER_LOGIN;

    this.http.post<any>(url, userdata).subscribe((respond: any) => {
      console.log(respond)
      if (respond && respond.length !== 0) {
        var user_data = respond[0];
        // console.log(respond[0])
        localStorage.setItem( "user_data",JSON.stringify(user_data.user_id));
        // localStorage.setItem( "token",respond.token);
        localStorage.setItem('isLoggedIn', 'true')
        this.router.navigateByUrl('admin');
      }
      else {
        alert("Invalid Username or Password");
      }

      // if (respond && respond.length !== 0) {
      //   var user_data = JSON.stringify(respond.data);
      //   localStorage.setItem( "UserData",user_data);
      //   localStorage.setItem( "token",respond.token);
      //   localStorage.setItem('isLoggedIn', 'true')

      //   alert("login successfull");
      //   if (respond.data.user_type == 'A') {
      //     console.log(localStorage.getItem('isLoggedIn'));
      //     this.router.navigateByUrl('admin');
      //   }
      //   else if (respond.data.user_type == 'T') {
      //     // localStorage.setItem('isLoggedIn', 'true')
      //     this.router.navigateByUrl('teacher');
      //   }
      //   else if (respond.data.user_type == 'S') {
      //     // localStorage.setItem('isLoggedIn', 'true')
      //     this.router.navigateByUrl('student');
      //   }

      // }
      // else {
      //   alert("Invalid Username or Password")
      // };
    })
  }





}
