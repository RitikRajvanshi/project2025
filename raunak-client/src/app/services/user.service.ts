import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.production';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  //creating a instance of behavoirSubject with initial value null
  private matchSource = new BehaviorSubject<any>(null);
  currentMatch = this.matchSource.asObservable();

  private userDataSubject = new BehaviorSubject<any>(this.getLocalStorageUser());
  userData$ = this.userDataSubject.asObservable();

  constructor(public http:HttpClient) { }

  getLocalStorageUser() {
    const data = localStorage.getItem('user_data');
    return data ? JSON.parse(data) : null;
  }

  changeMatch(match: any) {
    this.matchSource.next(match);
  }

  updateUserData(data: any) {
    localStorage.setItem('user_data', JSON.stringify(data));
    this.userDataSubject.next(data);
  }

  getUsersData(){
    const url = environment.ADMIN_URL + environment.ADMIN.GET_USERS_DATA;

    return this.http.get(url);
  }

    getAccountStatement(){
    const url = environment.ADMIN_URL + environment.ADMIN.GET_ACCOUNT_STATEMENT;

    return this.http.get(url);
  }



}
