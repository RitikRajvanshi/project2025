import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  passwordForm: any;
  
  passobj = {
    newPass:'',
    changePass:'',
    user_id:0
  }

  
  ngOnInit(){
    this.changePass();
  }

  changePass() {
    this.passwordForm = new FormGroup({
      newPass: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(7)]),
      confirmPass: new FormControl('', [Validators.required, this.passwordMatchValidator(),Validators.minLength(4), Validators.maxLength(7)])
    })
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
}
