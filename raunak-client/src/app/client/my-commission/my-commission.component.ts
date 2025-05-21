import { Component } from '@angular/core';

@Component({
  selector: 'app-my-commission',
  templateUrl: './my-commission.component.html',
  styleUrls: ['./my-commission.component.css']
})
export class MyCommissionComponent {
  startDate: string = '';
  endDate: string = '';
  commissionList: any[] = []; // Fill dynamically on search

  searchCommission() {
    // Fetch commission data based on date range
    console.log(this.startDate, this.endDate);
    // Dummy example: 
    this.commissionList = []; // Clear or load actual data
  }
}
