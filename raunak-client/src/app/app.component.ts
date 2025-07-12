import { Component, ElementRef, Renderer2 } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'raunak-client';
  userData: any;

  // constructor(private adminService:AdminService) {
  //   this.userData = localStorage.getItem('user_data');
  // }

  // ngOnInit():void{
  //   this.updateUser();
  // }

  // async updateUser() {
  //   const usersData: any = await firstValueFrom(this.adminService.getUsersData());
  //   console.log(usersData, "usersData");

  //   // 👇 Filter for current user only
  //   if (usersData && usersData.length > 0) {

  //     const updatedUser = usersData.find((u: any) => u.user_id == this.userData.user_id);

  //     // ✅ Update global userData
  //     if (updatedUser) {
  //       //update in whole application
  //       this.adminService.updateUserData(updatedUser);
  //     }

  //   }
  // }


}


