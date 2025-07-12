import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  passwordForm: any;
  
  passobj = {
    oldPass:'',
    newPass:'',
    changePass:'',
    user_id:0
  }

  getUseroldPassword:any;


  constructor(private adminService:AdminService){
    const userData = this.adminService.getLocalStorageUser();
    this.passobj.user_id = Number(userData?.user_id);
  }

  
  ngOnInit(){
    this.getUserData();
    this.changePass();
  }


  async getUserData(){
    const result:any = await firstValueFrom(this.adminService.getUsersData());
    const userDetail = result.filter((item:any) => Number(item.user_id) == this.passobj.user_id);
    this.getUseroldPassword = userDetail[0]?.password;
    console.log(this.getUseroldPassword, 'password')
  }

  
  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.root.get('newPass');
      const confirmPassword = control.root.get('confirmPass');

     // Check if both fields are non-empty before performing match validation
      if (password && confirmPassword && confirmPassword.value && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ 'passwordMismatch': true });
        return { 'passwordMismatch': true };
      } else {
        confirmPassword?.setErrors(null);
        return null;
      }
    };
  }

  

    changePass() {
    this.passwordForm = new FormGroup({
      oldPass:new FormControl('',[Validators.required]),
      newPass: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(7)]),
      confirmPass: new FormControl('', [Validators.required, this.passwordMatchValidator(),Validators.minLength(4), Validators.maxLength(7)])
    })
  }

}
