import { Component, NgZone } from '@angular/core';
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
  time:any;
  
  ngOnInit(){
    // this.todaysMatch();
    this.todaysMatch();
  }



  constructor(private userservice:UserService, private http:HttpClient){
  }

  async todaysMatch(){
    try{
        const url =`http://localhost:3000/client/all-matches`;     
        const results:any = await this.http.get(url).toPromise();
        this.matchesdata = results;
        this.time = results?.matchInfo?.time;
        console.log(results, "results");  
      
    }
    catch(err){
      console.error(err);
    }
  }

  

  // listenToLiveScore() {
  //   this.socketService.listen('scoreUpdate').subscribe((scoreData: any) => {
  //     console.log('Live Score Update:', scoreData);

  //     // Update matchesdata with the new score
  //     const matchIndex = this.matchesdata.findIndex(
  //       m => m.matchInfo?.matchId === scoreData.matchId
  //     );
  //     if (matchIndex !== -1) {
  //       this.matchesdata[matchIndex].score = scoreData.score;
  //     }
  //   });
  // }

  
  // setupSocketConnection() {
  //   this.socket = io('http://localhost:3000');

  //   this.socket.on('connect', () => {
  //     console.log('Socket connected');
  //   });

  //   this.socket.on('scoreUpdate', (updatedMatches: any[]) => {
  //     this.ngZone.run(() => {
  //       this.matchesdata = [...updatedMatches];;
  //       console.log('Live data updated');
  //     });
  //   });

  //   this.socket.on('disconnect', () => {
  //     console.log('Socket disconnected');
  //   });
  // }

  sendingMatchdata(data:any){
    // console.log(data.matchInfo.matchId, "matchInfo");
    // this.userservice.changeMatch(data.matchInfo.matchId);
    console.info(data);
  }

}
