import { Component } from '@angular/core';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-in-play',
  templateUrl: './in-play.component.html',
  styleUrls: ['./in-play.component.css']
})
export class InPlayComponent {

  date:any = moment().format('YYYY-MM-DD');
  matchesdata:any[]=[];
  
  ngOnInit(){
    this.todaysMatch();

  }

  constructor(private userservice:UserService, private http:HttpClient){
  }

  async todaysMatch(){
    try{
        const url =`http://localhost:3000/client/all-matches`;     
        const results:any = await this.http.get(url).toPromise();
        this.matchesdata = results.result;
        console.log(results.result, "results");
      
    }
    catch(err){
      console.error(err);
    }
  }

  sendingMatchdata(data:any){
    this.userservice.changeMatch(data);
  }

}
