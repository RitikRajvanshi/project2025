import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //creating a instance of behavoirSubject with initial value null
  private matchSource = new BehaviorSubject<any>(null);
  currentMatch = this.matchSource.asObservable();

  constructor() { }

  changeMatch(match: any) {
    this.matchSource.next(match);
  }
}
