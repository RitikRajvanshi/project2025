import { Component } from '@angular/core';

@Component({
  selector: 'app-bet-history',
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.css']
})
export class BetHistoryComponent {
// Filters
  fromDate: string = this.getFormattedDate(-2);
  toDate: string = this.getFormattedDate(0);
  searchClient: string = '';
  selectedStatus: string = 'Settled';
  activeTab: string = 'All';

  // Table data (placeholder)
  betHistoryData: any[] = []; // Can be filled from an API later
  filteredData: any[] = [];

  // Pagination
  entriesPerPage: number = 10;
  currentPage: number = 1;
  totalEntries: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Dummy data loading (replace with API later)
    this.betHistoryData = []; // Assume real data array here
    this.applyFilters();
  }

  applyFilters(): void {
    // Filter logic goes here (simplified)
    this.filteredData = this.betHistoryData.filter(entry => {
      const entryDate = new Date(entry.date);
      const from = new Date(this.fromDate);
      const to = new Date(this.toDate);
      return (
        (!this.searchClient || entry.client.toLowerCase().includes(this.searchClient.toLowerCase())) &&
        entry.status === this.selectedStatus &&
        entry.sport === this.activeTab || this.activeTab === 'All' &&
        entryDate >= from && entryDate <= to
      );
    });

    this.totalEntries = this.filteredData.length;
    this.currentPage = 1;
  }

  changeTab(tab: string): void {
    this.activeTab = tab;
    this.applyFilters();
  }

  // Utility: Format date YYYY-MM-DD
  getFormattedDate(offsetDays: number): string {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    return date.toISOString().split('T')[0];
  }

  // Pagination (to be expanded if needed)
  get paginatedData(): any[] {
    const start = (this.currentPage - 1) * this.entriesPerPage;
    return this.filteredData.slice(start, start + this.entriesPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }
}
