import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, firstValueFrom, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { io, Socket } from 'socket.io-client';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment.production';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';
import { ClientService } from 'src/app/services/client.service';

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
  timer: number = 15000;
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
  odds =
    {
      lagai: 0,
      khai: 0,
      isFavourite: false
    }
    ;

  oddsValue = {
    odd: 0,
    stake: 0,
    oddContext: ''
  }

  profit_loss = {
    bet:0,
    profit: 0,
    loss: 0
  }

  estimatedProfit = {
    profit: 0.00,
    loss: 0.00
  }

  userData: any;

  placeBetObj = {
    user_id: 0,
    match_id: 0,
    bet: 0,
    loss: 0,
    transaction_type: 'withdrawl',
    bet_type: '',
    team1: '',
    team2: '',
    betOnteam: '',
    bet_mode:'',
    prev_balance: 0.00,
    current_balance: 0.00,
    estimated_profit: 0.00,
    estimated_loss: 0.00,
    mode:'bet'
  }

  matchFulldatainarray: any[] = [];
  stakesValues:any;
  chipEntries:any;


  constructor(private route: ActivatedRoute, private http: HttpClient, private loaderService: LoaderService,private adminService:AdminService, 
    private sharedServices:SharedService, private clientService:ClientService) {

    this.adminService.userData$.subscribe((data) => {
      this.userData = data;
    })
    console.log(this.userData, 'this.userData');
    // const user_data: any = localStorage.getItem('user_data');
    // this.userData = JSON.parse(user_data);
    this.placeBetObj.user_id = this.userData.user_id;
    this.placeBetObj.prev_balance = this.userData.account_balance;
  }

  ngAfterViewInit() {
    this.route.paramMap.subscribe((params) => {
      this.matchId = params.get('id');
      this.placeBetObj.match_id = Number(this.matchId);
      console.log(this.matchId, "matchId");
      if (this.matchId) {
        if (!this.socket || !this.socket.connected) {
          this.connectSocket();
          this.getEstimatedProfitLossforcurrentMatch();
          this.getStakes();
        }
      }
    });
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


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


  connectSocket() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
      reconnection: true,           // Enable auto-reconnect
      reconnectionAttempts: Infinity, // Keep trying forever
      reconnectionDelay: 2000,      // Wait 2 seconds between tries
      timeout: 20000,               // Connection timeout
    });

    let loadStartTime: number;

    this.socket.on('connect', () => {
      console.log('✅ Connected to server via Socket.IO');
      loadStartTime = performance.now(); // Start time tracking
      this.loaderService.show();
    });

    this.socket.on('liveScoreUpdate', (liveMatches: any[]) => {
      const loadEndTime = performance.now(); // End time
      const loadDuration = loadEndTime - loadStartTime;
      console.log(`⏱️ Live data received in ${loadDuration.toFixed(2)} ms`);

      this.loaderService.hide();

      if (!Array.isArray(liveMatches) || liveMatches.length === 0) {
        console.warn('⚠️ Received empty or invalid live match data.');
        return;
      }

      const filtered = liveMatches.filter(match => match.matchInfo.matchId == this.matchId);

      if (filtered.length === 0) {
        console.warn('⚠️ Match not found in update. Keeping old data.');
        return;
      }

      const newMatch = filtered[0];
      this.matchFulldatainarray = filtered;
      this.matchData = newMatch;
      this.odds = newMatch.liveScore?.odds;
      this.placeBetObj.team1 = newMatch?.matchInfo?.team1;
      this.placeBetObj.team2 = newMatch?.matchInfo?.team2;



      console.log('📺 Live match data received:', this.matchData);
      console.log('🎯 Odds:', this.odds);

      const newRecentBalls = newMatch.recentBalls || [];
      const newBallCount = newRecentBalls.length;
      const lastBallCount = this.lastRecentBalls.length;

      if (newBallCount > lastBallCount) {
        const newBall = newRecentBalls[0];
        const newBallIndex = newBallCount - 1;

        this.updateBall(newBallIndex, newBall);

        if (newBallCount === 6) {
          this.currentBalls = Array(this.maxBalls).fill(null);
          this.currentBallIndex = -1;
        }
      }

      this.recentballsLive = newRecentBalls;
      this.lastRecentBalls = [...newRecentBalls];
    });

    this.socket.on('keepAlive', (data: any) => {
      console.log('🟢 Keep-alive received:', data.timestamp);
    });

    // this.socket.on('disconnect', () => {
    //   console.warn('🔌 Socket disconnected.');
    // });

    this.socket.on('matchCompleted', (data: any) => {
      console.log(`🔴 Match completed for matchId: ${data.matchId}. Disconnecting socket.`);
      this.socket?.disconnect();
    });

    this.socket.on('connect_error', (err: any) => {
      console.error('❌ Socket connection error:', err);
      this.loaderService.hide();
    });
  }



  updateBall(index: number, ball: any) {
    this.currentBalls[index] = ball.result.split(' run(s)')[0]; // e.g., '1 run', 'Wicket'
    this.currentBallIndex = index; // blink this ball

    // Optional: Force Angular change detection
    this.currentBalls = [...this.currentBalls];
  }

  getStake(value: number) {
    this.oddsValue.stake = +value;
    this.placeBetObj.bet_type = 'Fantasy';
    this.profit_loss.bet = +value;

    if (this.oddsValue.oddContext && this.oddsValue.oddContext == 'lagai') {
      this.profit_loss.profit = this.oddsValue.odd * this.oddsValue.stake;
      this.profit_loss.loss = this.oddsValue.stake;
      this.placeBetObj.loss = this.profit_loss.loss;
      this.placeBetObj.bet = this.profit_loss.loss;
      this.placeBetObj.estimated_loss = this.profit_loss.loss;
      this.placeBetObj.estimated_profit = this.profit_loss.profit;
     
    }
    else {
      this.profit_loss.profit = this.oddsValue.stake;
      this.profit_loss.loss = this.oddsValue.odd * this.oddsValue.stake;
      this.placeBetObj.loss = this.profit_loss.loss;
      this.placeBetObj.bet = this.profit_loss.profit;
      this.placeBetObj.estimated_loss = this.profit_loss.loss;
      this.placeBetObj.estimated_profit = this.profit_loss.profit;

    }
    console.log(this.placeBetObj, "this.placeBetObj")
  }


  //new code 
  openBetPabel(value: any, context: string, team: string) {
    console.log(value, "openBetPabel");
    if (value) {
      console.log(value, "value");
      // const lagai = value;

      this.oddsValue.odd = value / 100;
      this.oddsValue.oddContext = context;
      this.placeBetObj.bet_mode =context;
      this.placeBetObj.betOnteam = team;

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
        this.oddsValue.odd = 0;
        this.oddsValue.stake = 0;
        this.oddsValue.oddContext = '';
        this.profit_loss.profit = 0
        this.profit_loss.loss = 0

        this.openPanel = false;
      }, this.timer);
    }
    else {
      console.log('No value found');
    }


  }

  clearAll() {
    this.oddsValue.odd = 0;
    this.oddsValue.stake = 0;
    this.oddsValue.oddContext = '';
    this.profit_loss.profit = 0
    this.profit_loss.loss = 0

    this.openPanel = false;
  }

  openEditStake() {
    this.openDialogBox = !this.openDialogBox;
  }


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
    }, 20000); // Blinking every 5 seconds
  }



  async placeBet() {

    if (this.userData.account_balance < this.profit_loss.loss) {
      // alert('You don not have enough money');
      Swal.fire({
        title: "Insufficient coins!",
        icon: "warning"
      });

    }
    else if (this.profit_loss.bet < 100) {
      Swal.fire({
        title: "Minimum 100 coins are required.",
        icon: "warning"
      });
    }
    else {
      const url = environment.CLIENT_URL + environment.CLIENT.PLACE_BET;

      const result: any = await firstValueFrom(this.http.post(url, this.placeBetObj));
      if (result && result?.message) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: `${result?.message}!`,
          showConfirmButton: false,
          timer: 1000
        });

        const usersData: any = await firstValueFrom(this.adminService.getUsersData());
        console.log(usersData, "usersData");

        // 👇 Filter for current user only
        if (usersData && usersData.length > 0) {
          const updatedUser = usersData.find((u: any) => u.user_id == this.userData.user_id);
          console.log(updatedUser, "updatedUser");

          // ✅ Update global userData
          if (updatedUser) {
            //update in whole application
            this.adminService.updateUserData(updatedUser);
          }
        }

        await this.getEstimatedProfitLossforcurrentMatch();
  
      }



    }

  }

  async getEstimatedProfitLossforcurrentMatch(){
        const betData: any = await firstValueFrom(this.sharedServices.getAccountStatement());
        const filteredData = betData
          .filter((item: any) => item.user_id == this.userData.user_id && item.match_id == this.placeBetObj.match_id);

        // Calculate totals
        let totalEstimatedProfit = 0;
        let totalEstimatedLoss = 0;
        console.log(filteredData)

        filteredData.forEach((item: any) => {
          totalEstimatedProfit += parseFloat(item.estimated_profit || 0);
          totalEstimatedLoss += parseFloat(item.estimated_loss || 0);
        });

        console.log('Total Estimated Profit:', totalEstimatedProfit);
        console.log('Total Estimated Loss:', totalEstimatedLoss);
        this.estimatedProfit.profit = totalEstimatedProfit;
        this.estimatedProfit.loss = totalEstimatedLoss;
  }


   async getStakes() {
    try {
      const result: any = await firstValueFrom(this.sharedServices.getStakes());
      const stakesData = result.filter((item: any) => {
        return item?.user_id == this.userData?.user_id;
      });
      this.stakesValues = stakesData[0]?.stake_value;

      //converting from object {"100":100 } --> ["100":100] --> [{key:"100", value:100}]

      this.chipEntries = Object.entries(this.stakesValues).map(([key, value]) => ({ key, value }));

      console.log(this.chipEntries, "this.stakesValues");

    } catch (error) {
      console.error(error);
    }
  }

    async updateStakes() {
      const chipsToSave: any = {};
      const chipsObj: any = {
        user_id: Number(this.userData?.user_id),
        chips: {}
      }
      this.chipEntries.forEach((entry: any) => {
        chipsToSave[entry.key] = Number(entry.value);
      })
  
      chipsObj.chips = chipsToSave;
  
      const result: any = await firstValueFrom(this.clientService.updateStakes(chipsObj));
      console.log(result, 'chipsObj')
      if (result) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: `${result?.message}!`,
          showConfirmButton: false,
          timer: 1000
        });
        this.getStakes();
        this.openDialogBox = false;
      }
    }

}