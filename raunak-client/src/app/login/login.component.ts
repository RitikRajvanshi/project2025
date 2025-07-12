import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any;

  constructor(private router: Router, private http: HttpClient, private adminService: AdminService) { }


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
    if (this.loginForm.invalid) {
      this.loginForm.controls['user_name'].markAsTouched();
      this.loginForm.controls['user_password'].markAsTouched();
    }
    else {
      const url = environment.LOGIN_URL + environment.LOGIN.USER_LOGIN;
      this.http.post<any>(url, userdata).subscribe({
        next: (response: any) => {
          if (response && response.user_data) {
            const user_data = response.user_data;

            this.adminService.updateUserData(user_data);
            localStorage.setItem('isLoggedIn', 'true');

          }
          else {
            console.log('else part');
            Swal.fire({
              icon: "error",
              title: "Invalid Username or Password!",
            });
            return
            // alert("Invalid Username or Password");
          }

          this.router.navigate(['client']);
        },
        error: (error) => {
          console.log(error.status, "status");
          if (error.status === 401) {
            Swal.fire({
              icon: "error",
              title: "User not found!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Unauthorized: Invalid credentials!",
            });
          }
        }
      }
      )
    }
    // console.log(userdata)


  }


}
