import { Component } from '@angular/core';

@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.css']
})
export class ProfitLossComponent {
// Filters
  selectedEventType: string = 'all';
  fromDate: string = this.getFormattedDate(-2);  // 2 days ago
  toDate: string = this.getFormattedDate(0);     // today

  // Pagination
  entriesPerPage: number = 10;
  currentStartIndex: number = 0;
  currentEndIndex: number = 3;
  totalEntries: number = 3;

  // Table data (replace with real API data)
  profitLossData = [
    {
      eventName: 'United Arab Emirates v Bangladesh',
      market: 'Odds',
      p_l: 0.00,
      commission: -0.00,
      createdOn: '2025-05-17 20:30:00'
    },
    {
      eventName: 'R C Bengaluru v Kolkata Knight Riders',
      market: 'Odds',
      p_l: 0.00,
      commission: -0.00,
      createdOn: '2025-05-17 19:30:00'
    },
    {
      eventName: 'USA v Canada',
      market: 'Odds',
      p_l: 0.00,
      commission: -0.00,
      createdOn: '2025-05-17 19:30:00'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.updatePagination();
  }

  filter(): void {
    console.log('Filtering with:', {
      eventType: this.selectedEventType,
      from: this.fromDate,
      to: this.toDate
    });

    // Add actual filtering logic or API call here
  }

  updatePagination(): void {
    this.currentStartIndex = 0;
    this.currentEndIndex = Math.min(this.entriesPerPage, this.profitLossData.length);
    this.totalEntries = this.profitLossData.length;
  }

  // Utility: returns formatted date string 'YYYY-MM-DD' relative to today
  getFormattedDate(offsetDays: number): string {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    return date.toISOString().split('T')[0];
  }
}
