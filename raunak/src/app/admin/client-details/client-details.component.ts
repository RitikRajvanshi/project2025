import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { debounceTime } from 'rxjs/operators';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent {
  @ViewChild('closebtn', { static: false }) closebutton!: ElementRef;
  @ViewChild('closebtn2', { static: false }) closebutton2!: ElementRef;
  @ViewChild('closebtn3', { static: false }) closebutton3!: ElementRef;

  users_data: any;
  role: any;
  id: Number = 0;
  clientDataArray: any;
  passwordForm: any;
  coinsForm: any;

  passobj = {
    newPass: '',
    changePass: '',
    user_id: 0
  }
  coinUpdate = {
    user_id: 0,                  //parentid
    user_code: '',
    parent_id: 0,
    parent_code: '',
    parent_account_balance: 0,
    account_balance: 0,
    new_coins: 0
  }

  user_id: any = 0;

  parrentaccount = 0;
  useraccount = 0;
  disableSubmit = false;
  isDeposit: boolean = true;
  transactionArray: any[] = [];
transactionObjforuser = {
    user_id: 0,
    transaction_type: '',
    prev_balance: 0.00,
    current_balance: 0.00,
    description: '',
    points: 0.00,
    mode:'charge'
  }

  transactionObjforparent = {
    user_id: 0,
    transaction_type: '',
    prev_balance: 0.00,
    current_balance: 0.00,
    description: '',
    points: 0.00,
    mode:'charge'
  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private adminService: AdminService) {

  }

  ngOnInit() {
    const idfromparams = this.route.snapshot.paramMap.get('id');
    if (idfromparams) {
      this.id = + idfromparams;
      console.log(idfromparams, "idfromparams");
    }
    this.changePass();
    this.addcoinsform();

    // this.coinsForm.get('new_coins')?.valueChanges
    //   .pipe(debounceTime(500))
    //   .subscribe((value: any) => {
    //     const newCoins = Number(value);
    //     this.processCoinUpdate(newCoins);
    //   });

  }

  ngAfterViewInit() {
    this.getUserdata();
  }

  getUserdata() {
    const user_data = localStorage.getItem('user_data');
    const url = environment.ADMIN_URL + environment.ADMIN.GET_USER_DATA;
    if (user_data) {
      this.user_id = + user_data;

      const UserId = {
        user_id: + user_data,
      }

      this.transactionObjforuser.user_id = Number(user_data);


      // console.log(UserId, "UserId");

      this.http.post<any>(url, UserId).subscribe((results: any) => {
        // console.log(results, "results");
        this.users_data = results[0];

        this.role = results[0].level;
        this.clientData(results[0]);
      })
    }
  }

  getparentdatabyuserid(user_id: any) {
    console.log(user_id, "userid")
    const url = environment.ADMIN_URL + environment.ADMIN.GET_PARENT_USER_DATA_BY_USERID;

    this.http.post(url, user_id).subscribe((results: any) => {
      // console.log(results, "parentdata");
      this.coinUpdate.parent_code = results[0]?.parent_code;
      this.coinUpdate.parent_account_balance = Number(results[0]?.parent_account_balance);
      this.parrentaccount = Number(results[0]?.parent_account_balance);
      this.transactionObjforparent.user_id = results[0]?.user_id;
      this.transactionObjforparent.prev_balance = this.parrentaccount;
    })

  }

  clientData(created_by: any) {
    const url = environment.ADMIN_URL + environment.ADMIN.GET_USERS_HIERARCHICAL_DATA;
    // console.log(url, "URL")
    this.http.post<any>(url, created_by).subscribe((results: any) => {
      // console.log(results, "gethierarhchaldata");
      // this.subAdminDataArray = results;

      this.clientDataArray = results.filter((data: any) => {
        return data.level == 7;
      });

    })
  }

  updateStatus(data: any) {
    const url = environment.ADMIN_URL + environment.ADMIN.UPDATE_STATUS;
    var updatedStatus = 0;
    if (data.status == 0) {
      updatedStatus = 1;
    }
    else {
      updatedStatus = 0;
    }

    const forStatus = {
      status: updatedStatus,
      user_id: data.user_id
    }

    this.http.post(url, forStatus).subscribe((result: any) => {
      alert(result.message);
      this.ngAfterViewInit();
    })
  }


  accountLock(data: any) {
    const url = environment.ADMIN_URL + environment.ADMIN.ACCOUNT_LOCK;
    var updatedAccountStatus = 0;
    if (data.account_lock == 0) {
      updatedAccountStatus = 1;
    }
    else {
      updatedAccountStatus = 0;
    }

    const forStatus = {
      account_lock: updatedAccountStatus,
      user_id: data.user_id
    }

    this.http.post(url, forStatus).subscribe((result: any) => {
      alert(result.message);
      this.ngAfterViewInit();
    })
  }

  betLock(data: any) {
    const url = environment.ADMIN_URL + environment.ADMIN.BET_LOCK;
    var updatedbetlockStatus = 0;
    if (data.bet_lock == 0) {
      updatedbetlockStatus = 1;
    }
    else {
      updatedbetlockStatus = 0;
    }

    const forStatus = {
      bet_lock: updatedbetlockStatus,
      user_id: data.user_id
    }

    this.http.post(url, forStatus).subscribe((result: any) => {
      alert(result.message);
      this.ngAfterViewInit();
    })
  }


  // accountLock(userdata: any) {
  //   const userId = {
  //     user_id: userdata.user_id,
  //   }
  // }

  sendinguser(data: any) {
    this.passobj.user_id = data.user_id;
    console.log(data, "dataforcoins")
    this.coinUpdate.user_id = data.user_id;
    // operation === 'Deposit' ? this.isDeposit == true : this.isDeposit == false;

    // this.isDeposit = operation === 'Deposit';

    this.coinUpdate.parent_id = data.created_by;

    this.coinUpdate.user_code = data.user_code;
    this.coinUpdate.account_balance = data.account_balance;
    this.useraccount = data.account_balance;
    this.transactionObjforuser.prev_balance = Number(data.account_balance);
    // console.log(this.isDeposit, "this.isDeposit")
    setTimeout(() => {
      this.getparentdatabyuserid(this.coinUpdate);
    }, 500);
  }

  changepassword() {
    console.log(this.passobj, "password change object");
    const url = environment.ADMIN_URL + environment.ADMIN.CHANGE_PASSWORD;
    this.http.post(url, this.passobj).subscribe((result: any) => {
      Swal.fire({
        icon: "success",
        title: "Password Changed!",
        showConfirmButton: false,
        timer: 1000
      }).then(() => {
        this.changePass();
        setTimeout(() => {
          this.closebutton.nativeElement.click();
        }, 100); // Adjust the delay time as needed
      })
    })
  }

  dynamicCoins(event: Event) {
    const newCoins: any = Number(this.coinsForm.get('new_coins').value);
    this.transactionObjforuser.transaction_type = 'deposit';
    this.transactionObjforparent.transaction_type = 'withdrawl';

    if (this.parrentaccount < newCoins) {
      event.preventDefault();
      this.disableSubmit = true;
    }
    let Accountbalance: number;
    let newAccountbalance: number;

    this.disableSubmit = false;

    Accountbalance = Number(this.parrentaccount) - newCoins;
    newAccountbalance = Number(this.useraccount) + newCoins;


    this.coinUpdate.parent_account_balance = +Accountbalance.toFixed(2);
    this.coinUpdate.account_balance = +newAccountbalance.toFixed(2);

    this.transactionObjforuser.current_balance = Number(this.coinUpdate.account_balance.toFixed(2));

    this.transactionObjforuser.description = `Mobile Charge by ${newCoins} coins`;

    this.transactionObjforparent.description = `Withdraw ${newCoins} coins`;

    this.transactionObjforuser.points = Number(newCoins);
    this.transactionObjforparent.points = -Number(newCoins);

    this.transactionObjforparent.current_balance = Number(this.transactionObjforparent.prev_balance.toFixed(2)) + Number(this.transactionObjforparent.points.toFixed(2));

  }

  dynamicCoins2(event: Event) {
    const newCoins: any = Number(this.coinsForm.get('new_coins').value);

    this.transactionObjforuser.transaction_type = 'withdrawl';
    this.transactionObjforparent.transaction_type = 'deposit';

    if (this.useraccount < this.coinUpdate.new_coins) {
      event.preventDefault();
      this.disableSubmit = true;
    }
    else {
      this.disableSubmit = false;

      let Accountbalance: number;
      let newAccountbalance: number;

      this.disableSubmit = false;

      Accountbalance = Number(this.parrentaccount) + newCoins;
      newAccountbalance = Number(this.useraccount) - newCoins;


      this.coinUpdate.parent_account_balance = +Accountbalance.toFixed(2);
      this.coinUpdate.account_balance = +newAccountbalance.toFixed(2);

      this.transactionObjforuser.description = `User minus by ${newCoins} coins`;
      this.transactionObjforuser.points = -Number(newCoins);
      this.transactionObjforparent.points = Number(newCoins);

      this.transactionObjforparent.current_balance = Number(this.transactionObjforparent.prev_balance.toFixed(2)) + Number(this.transactionObjforparent.points.toFixed(2));

      this.transactionObjforuser.current_balance = Number(this.coinUpdate.account_balance.toFixed(2));

      this.transactionObjforuser.description = `Withdraw ${newCoins} coins`;

      this.transactionObjforparent.description = `Deposit ${newCoins} coins`;
    }
  }

  addcoins() {

    const url = environment.ADMIN_URL + environment.ADMIN.DEPOSIT_COINS;
    // console.log(this.coinUpdate, "this.coinUpdate")

    this.http.post(url, this.coinUpdate).subscribe((results: any) => {
      // console.log(results);
      Swal.fire({
        icon: "success",
        title: "Coins Deposited Successfully!",
        showConfirmButton: false,
        timer: 1000
      }).then(() => {
        this.addcoinsform();
        this.getUserdata();

        setTimeout(() => {
          this.closebutton2.nativeElement.click();
        }, 100);

        const transactions = [
          this.transactionObjforuser,   // credit
          this.transactionObjforparent  // withdraw
        ];

        this.saveTransaction(transactions);
      })
    })
  }

  substractCoins() {
    const url = environment.ADMIN_URL + environment.ADMIN.DEPOSIT_COINS;
    this.http.post(url, this.coinUpdate).subscribe((results: any) => {
      // console.log(results);
      Swal.fire({
        icon: "success",
        title: "Coins withdraw Successfully!",
        showConfirmButton: false,
        timer: 1000
      }).then(() => {
        this.addcoinsform();
        this.getUserdata();
        setTimeout(() => {
          this.closebutton3.nativeElement.click();
        }, 100);

       const transactions = [
          this.transactionObjforuser,   // credit
          this.transactionObjforparent  // withdraw
        ];

        this.saveTransaction(transactions);

      })
    })
  }

  changePass() {
    this.passwordForm = new FormGroup({
      newPass: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(7)]),
      confirmPass: new FormControl('', [Validators.required, this.passwordMatchValidator(), Validators.minLength(4), Validators.maxLength(7)])
    })
  }

  addcoinsform() {
    this.coinsForm = new FormGroup({
      new_coins: new FormControl(0, [Validators.required]),
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

  close() {
    this.passobj = {
      newPass: '',
      changePass: '',
      user_id: 0
    }

    this.passwordForm.get('newPass').markAsUntouched();
    this.passwordForm.get('confirmPass').markAsUntouched();
  }

  async saveTransaction(data: Array<any>) {
    try {
      // Modify user transaction (credit)
      const result = await firstValueFrom(this.adminService.saveTransaction(data));
      console.info(result, "saveTransaction");

    }
    catch (error) {
      console.error(error);
    }
  }


}


