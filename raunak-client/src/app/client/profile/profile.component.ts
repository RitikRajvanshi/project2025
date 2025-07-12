import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  users_data:any;

  constructor(private adminService:AdminService){
    
  }

  ngOnInit(){
    this.getUsersData();
  }


 async getUsersData(){
  this.users_data = this.adminService.getLocalStorageUser();
  console.log(this.users_data, "this.users_data");
  }

}
