import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.matchId = params.get('id');
      if (this.matchId) {
        this.startFetchingLiveData();
        this.getothersData();
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
          this.liveData = data.result[0].comments.Live; // Assuming the data is an array of objects
          console.log(this.liveData, "livedata");
        },
        error => {
          console.error('Error fetching live data', error);
        }
      );
  }

  async getMatchData(): Promise<any> {
    const url = `http://localhost:3000/client/specific-match`;
    if (this.matchId) {
      const matchId = {
        match_id: +this.matchId
      };

      return await this.http.post(url, matchId).toPromise();
    }
    return { result: [] };
  }

  async getothersData() {
    const url = `http://localhost:3000/client/specific-match`;
    if (this.matchId) {
      const matchId = {
        match_id: +this.matchId
      };

      const results:any= await this.http.post(url, matchId).toPromise();
      console.log(results.result, "results");
      this.matchData = results?.result ;
    }
    
  }

}






