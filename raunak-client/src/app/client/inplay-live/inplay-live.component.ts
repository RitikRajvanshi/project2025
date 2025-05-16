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
  matchData: any;
  private subscription: Subscription | undefined;
  private socket: Socket | undefined;
  // new code

  openPanel: boolean = false;
  openDialogBox: boolean = false;
  intervalId: any;
  timer: number = 8000;
  countdown: number = this.timer / 1000;
  savecountdown: number = 0;
  bgcolor: string = '';
  intervalId2: any;

  // currentBalls: number[] = [];
  currentBalls: (number | null)[] = Array(6).fill(null); // 6 static balls, no number initially
  maxBalls: number = 6;
  currentBallIndex = 0;
  recentballsLive: any[] = [];
  lastRecentBalls: any[] = [];
    odds  =
      {
        lagai:0,
        khai:0,
        isFavourite:false
      }
    ;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.matchId = params.get('id');
      console.log(this.matchId, "matchId");
      if (this.matchId) {
        // this.startFetchingLiveData();
        // this.getothersData();
        this.connectSocket();
        // this.startOverAnimation(this.recentballsLive);
        // this.startOverAnimation();
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

    const result: any = await this.http.get(url).toPromise();
    return result.filter((specificData: any) => {
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

  // async getothersData() {
  //   const url =`http://localhost:3000/client/all-matches`;     
  //   const results:any = await this.http.get(url).toPromise();

  //   this.matchData = results.filter((specificData:any)=>
  //   {
  //     return specificData.matchInfo.matchId == this.matchId;
  //   }
  //   );
  //   console.log(this.matchData, "results");
  //   }

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

          this.odds = filtered[0].liveScore?.odds;

          console.log(this.matchData, "this.matchData", this.odds, "odds");
          
          const newMatch = filtered[0];

          const newRecentBalls = newMatch.recentBalls;

          this.matchData = newMatch;

          const newBallCount = newRecentBalls.length;
          const lastBallCount = this.lastRecentBalls.length;

          // Only update if a new ball has been added
          if (newBallCount > lastBallCount) {
            const newBall = newRecentBalls[0]; // latest ball is at 0 because of unshift
            const newBallIndex = newBallCount - 1; // position in currentBalls (0-based)

            // Update the ball and set blink index
            this.updateBall(newBallIndex, newBall);

            // If 6 balls are completed, reset for the next over
            if (newBallCount === 6) {
              this.currentBalls = Array(this.maxBalls).fill(null);
              this.currentBallIndex = -1;
            }
          }

          this.recentballsLive = newRecentBalls;
          this.lastRecentBalls = [...newRecentBalls]; // Save snapshot
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

  updateBall(index: number, ball: any) {
    this.currentBalls[index] = ball.result.split(' run(s)')[0]; // e.g., '1 run', 'Wicket'
    this.currentBallIndex = index; // blink this ball
  
    // Optional: Force Angular change detection
    this.currentBalls = [...this.currentBalls];
  }


  //new code 
  openBetPabel(value: any) {
    if(value){
      console.log(value, "value");
      this.openPanel = true;
      this.savecountdown = this.countdown;
      // Clear any existing interval
      clearInterval(this.intervalId);
  
      // Start countdown animation
      this.intervalId = setInterval(() => {
        if (this.savecountdown > 1) {
          this.savecountdown--;
        }
        else if (this.savecountdown > 1) {
          this.bgcolor = 'red';
        }
  
        else {
          clearInterval(this.intervalId);
        }
      }, 1000);
  
      // Hide panel after timer
      setTimeout(() => {
        this.openPanel = false;
      }, this.timer);
    }
    else{
      console.log('No value found');
    }


  }

  openEditStake() {
    this.openDialogBox = !this.openDialogBox;
  }

  // startOverAnimation() {
  //   this.currentBalls = Array(this.maxBalls).fill(null);
  //   this.currentBallIndex = 0;

  //   if (this.intervalId) {
  //     clearInterval(this.intervalId); // avoid multiple intervals
  //   }  

  //   this.intervalId = setInterval(() => {
  //     if (this.currentBallIndex < this.maxBalls) {
  //       this.currentBalls[this.currentBallIndex] = this.currentBallIndex + 1;
  //       this.currentBallIndex++;
  //     } else {
  //       this.currentBallIndex = 0; // restart
  //       this.currentBalls = Array(this.maxBalls).fill(null); // reset balls
  //     }
  //   }, 5000); // change every 5 seconds
  // }

  // startOverAnimation(recentBallsFromBackend: any[]) {
  //   // Prepare results in correct order (ball 1 to ball 6)
  //   const latestOverBalls = [...recentBallsFromBackend]
  //     .slice(0, 6)
  //     .reverse()
  //     .map(b => b.result === 'Wicket' ? 'W' : b.result.split(' ')[0]); // '1 run(s)' => '1'
  //     console.log(latestOverBalls, "latestOverBalls");

  //   this.currentBalls = Array(this.maxBalls).fill(null); // Reset display
  //   this.currentBallIndex = 0;

  //   if (this.intervalId) {
  //     clearInterval(this.intervalId);
  //   }

  //   this.intervalId = setInterval(() => {
  //     if (this.currentBallIndex < latestOverBalls.length) {
  //       this.currentBalls[this.currentBallIndex] = latestOverBalls[this.currentBallIndex];
  //       this.currentBallIndex++;
  //     } else {
  //       clearInterval(this.intervalId); // Stop after 6 balls
  //     }
  //   }, 2000); // Change every 2 seconds
  // }

  startOverAnimation(recentBalls: any[]) {
    this.maxBalls = 6; // Maximum balls per over
    this.currentBalls = Array(this.maxBalls).fill(null);
    this.currentBallIndex = -1; // Initially, no ball is blinking

    // Check if the incoming ball data is different
    if (recentBalls && recentBalls.length > 0) {
      const lastBall = recentBalls[recentBalls.length - 1];

      // Identify the current ball number, based on the length of recent balls
      this.currentBallIndex = recentBalls.length - 1;

      // Update ball number with its respective score
      this.currentBalls[this.currentBallIndex] = lastBall.result; // Insert the score for the current ball
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    // Start the interval for blinking the balls
    this.intervalId = setInterval(() => {
      if (this.currentBallIndex < this.maxBalls - 1) {
        // Continue to blink the next ball in sequence
        this.currentBallIndex++;
      } else {
        // If over is complete, reset after the last ball (6 balls)
        this.currentBallIndex = 0; // Restart blinking from the first ball again
      }

      // Update the animation
      this.currentBalls = [...this.currentBalls]; // Trigger Angular change detection
    }, 10000); // Blinking every 5 seconds
  }

}