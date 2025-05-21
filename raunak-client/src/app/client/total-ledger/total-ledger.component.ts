import { Component } from '@angular/core';

@Component({
  selector: 'app-total-ledger',
  templateUrl: './total-ledger.component.html',
  styleUrls: ['./total-ledger.component.css']
})
export class TotalLedgerComponent {
  fromDate: string = '';
  toDate: string = '';
  selectedType: string = 'All';

  lena = 0;
  dena = 198;
  get balance() {
    return this.lena - this.dena;
  }

  currentPage = 1;
  totalPages = 1;

  ledgerData = [
    {
      date: '18 May 2025 03:00 am',
      collection: 'Cricket - USA v Canada',
      debit: 0,
      credit: 0,
      balance: -198,
      paymentType: '',
      remark: 'User Minus'
    },
    {
      date: '18 May 2025 00:18 am',
      collection: 'Cricket - United Arab Emirates v Bangladesh',
      debit: 0,
      credit: 0,
      balance: -198,
      paymentType: '',
      remark: 'User Minus'
    },
    // ...other rows
  ];

  search() {
    // implement search logic
  }

  goBack() {
    // implement back navigation
  }

  goToFirst() { this.currentPage = 1; }
  prevPage() { if (this.currentPage > 1) this.currentPage--; }
  nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }
  goToLast() { this.currentPage = this.totalPages; }
}
