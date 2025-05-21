import { Component, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from './services/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'raunak-client';
  userData: any;

  constructor(private userService: UserService) {
    this.userData = localStorage.getItem('user_data');
  }

  ngOnInit():void{
    this.updateUser();
  }

  async updateUser() {
    const usersData: any = await firstValueFrom(this.userService.getUsersData());
    console.log(usersData, "usersData");

    // 👇 Filter for current user only
    if (usersData && usersData.length > 0) {

      const updatedUser = usersData.find((u: any) => u.user_id == this.userData.user_id);

      // ✅ Update global userData
      if (updatedUser) {
        //update in whole application
        this.userService.updateUserData(updatedUser);
      }

    }
  }


}


