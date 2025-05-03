import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-inplay-live',
  templateUrl: './inplay-live.component.html',
  styleUrls: ['./inplay-live.component.css']
})
export class InplayLiveComponent {
  matchId: string | null = null;
  liveData: any[] = [];
  matchData:any;
  private subscription: Subscription | undefined;
  private socket: Socket | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.matchId = params.get('id');
      console.log(this.matchId, "matchId");
      if (this.matchId) {
        // this.startFetchingLiveData();
        // this.getothersData();
        this.connectSocket();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // startFetchingLiveData() {
  //   this.subscription = interval(5000) // Fetch data every 5 seconds
  //     .pipe(
  //       switchMap(() => this.getMatchData())
  //     )
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.liveData = data.result[0].comments.Live; // Assuming the data is an array of objects
  //         console.log(this.liveData, "livedata");
  //       },
  //       error => {
  //         console.error('Error fetching live data', error);
  //       }
  //     );
  // }

  startFetchingLiveData() {
    this.subscription = interval(5000) // Fetch data every 5 seconds
      .pipe(
        switchMap(() => this.getMatchData())
      )
      .subscribe(
        data => {
          console.log(data);
          // this.liveData = data.result[0].comments.Live; // Assuming the data is an array of objects
          this.liveData = data.liveScore; // Assuming the data is an array of objects
          console.log(this.liveData, "livedata");
        },
        error => {
          console.error('Error fetching live data', error);
        }
      );
  }

  // async getMatchData(): Promise<any> {
  //   const url = `http://localhost:3000/client/specific-match`;
  //   if (this.matchId) {
  //     const matchId = {
  //       match_id: +this.matchId
  //     };

  //     return await this.http.post(url, matchId).toPromise();
  //   }
  //   return { result: [] };
  // }

  async getMatchData(): Promise<any> {
    const url = `http://localhost:3000/client/all-matches`;
    // if (this.matchId) {
    //   const matchId = {
    //     match_id: +this.matchId
    //   };

    const result:any =  await this.http.get(url).toPromise();
    return result.filter((specificData:any)=>
      {
        return specificData.matchInfo.matchId == this.matchId;
      }
      );
    }

  // async getothersData() {
  //   const url = `http://localhost:3000/client/specific-match`;
  //   if (this.matchId) {
  //     const matchId = {
  //       match_id: +this.matchId
  //     };

  //     const results:any= await this.http.post(url, matchId).toPromise();
  //     console.log(results.result, "results");
  //     this.matchData = results?.result ;
  //   }
    
  // }

  async getothersData() {
    const url =`http://localhost:3000/client/all-matches`;     
    const results:any = await this.http.get(url).toPromise();
    
    this.matchData = results.filter((specificData:any)=>
    {
      return specificData.matchInfo.matchId == this.matchId;
    }
    );
    console.log(this.matchData, "results");
    }

    connectSocket() {
      this.socket = io('http://localhost:3000'); // Change to your backend URL
  
      this.socket.on('connect', () => {
        console.log('Connected to server via Socket.IO');
      });
  
      // this.socket.on('liveScoreUpdate', (liveMatches: any[]) => {
      //   const filtered = liveMatches.filter(match => match.matchInfo.matchId == this.matchId);
      //   this.matchData = filtered.length ? filtered[0] : null;
      //   console.log('Received live data:', this.matchData);
      // });

      this.socket.on('liveScoreUpdate', (liveMatches: any[]) => {
        if (Array.isArray(liveMatches) && liveMatches.length > 0) {
          const filtered = liveMatches.filter(match => match.matchInfo.matchId == this.matchId);
          if (filtered.length > 0) {
            this.matchData = filtered[0];
          } else {
            console.warn('Match not found in update. Keeping old data.');
            // Optional: keep previous data or set to null if you prefer
            // this.matchData = null;
          }
        } else {
          console.warn('Received empty or invalid live match data. Keeping old data.');
          // Optional: keep previous data or set to null if you prefer
          // this.matchData = null;
        }
    
        // console.log('Processed live data:', this.matchData);
      });
  
      this.socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
    }
  
}