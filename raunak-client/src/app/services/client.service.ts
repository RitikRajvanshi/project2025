import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.production';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

    updateStakes(data:any){
    const url = environment.CLIENT_URL + environment.CLIENT.UPDATE_STAKE;

    return this.http.post(url, data);
  }
}
