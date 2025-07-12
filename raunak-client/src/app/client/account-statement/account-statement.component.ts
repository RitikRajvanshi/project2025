import { Component } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { AdminService } from 'src/app/services/admin.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})
export class AccountStatementComponent {
  fromDate: string = '';
  toDate: string = '';
  // currentPage: number = 1;
  // totalPages: number = 1;
  userData:any;
  accountData:any[] = [];
  itemsData:any[] = [];
  page: any = 1;
  count: any = 0;
  tableSize: any = 20;
  itemsperPage:any = 20;
  tableSizes: any = [20, 50, 100, 'All'];
  searchTerm:any;
  totalItems:any;

   reportData = [
    {
      date: '18 May 2025 02:59 am',
      description: 'Cricket / USA v Canada / Match / USA v Canada / 34306999 / USA',
      prevBal: 2, cr: 0, dr: 0, commPlus: 0, commMinus: 0, balance: 2
    },
    {
      date: '18 May 2025 00:17 am',
      description: 'Cricket / United Arab Emirates v Bangladesh / Match / 34321278 / Bangladesh',

      prevBal: 2, cr: 0, dr: 0, commPlus: 0, commMinus: 0, balance: 2

    },
    {
      date: '17 May 2025 22:29 pm',
      description: 'Cricket / R C Bengaluru v Kolkata Knight Riders / 34316669 / No Result',
      prevBal: 2, cr: 0, dr: 0, commPlus: 0, commMinus: 0, balance: 2
    }
  ];

  constructor(private adminService:AdminService, private sharedService:SharedService){

    this.userData = this.adminService.getLocalStorageUser();
    console.log(this.userData, "this.accountData");
  }

  ngOnInit():void{
    this.getAccountData();
  }

  async getAccountData (){
      try{
        const result:any = await firstValueFrom(this.sharedService.getAccountStatement());


        const filteredData = result
        .filter((item:any)=> item.user_id == this.userData.user_id)
        .map((data:any)=>{
          const filteredtransactionDate = data.transaction_date?moment(data.transaction_date).local().format('DD MMMM YYYY hh:mm a'):'';
          const filteredmatchDate = data.match_date?moment(data.match_date).local().format('DD MMMM YYYY hh:mm a'):'';
          return {...data , transaction_date:filteredtransactionDate , match_date:filteredmatchDate};
        })
       
        this.accountData=filteredData;
        this.itemsData = this.accountData;
        this.totalItems = this.accountData.length;
        console.log(this.accountData, "accountData")
      }
      catch(err){
        console.log(err, "err");
      }
  }

    ontableDatachange(event: any) {
    this.page = event;
    // this.supplierdatalist();
  }

   ontableSizechange(event: any): void {
    const Value = event.target.value
    // this.tableSize = ;
    if(Value == "All"){
      this.tableSize = +this.count;
    }
    else {
      // Otherwise, set the table size to the selected value
      this.tableSize = +Value;
    }

    this.page = 1;
    // this.supplierdatalist();
  }

  async filterData(): Promise<void> {
    // Initialize itemsData if not already initialized
    if (!this.itemsData) {
      // Initialize with appropriate default value or fetch data
      this.itemsData = [];
    }

    console.log(this.itemsData, "this.itemsData");
    // Start with the original data or the previously filtered data
    let filteredData: any[] = this.itemsData;
    // Filter by search term
    // if (this.searchTerm) {
    //   filteredData = filteredData.filter((item: any) => {
    //     return Object.keys(item).some(key => {
    //       if (item[key] !== null && item[key] !== '' && key === 'transaction_date') {
    //         return item[key]?.includes(this.searchTerm);
    //       } else if (item[key] !== null && item[key] !== '') {
    //         return item[key]?.toString().toLowerCase()?.includes(this.searchTerm.toLowerCase());
    //       }
    //       return false;
    //     });
    //   });
    // }

    // Filter by date range for VendordatabyDate
    if (this.fromDate && this.toDate) {
      if (this.fromDate <= this.toDate) {

        filteredData = filteredData.filter((item: any) => {
          // console.log(item?.created_date)
          const filteredtransactiondate = moment(item?.transaction_date, 'DD MMMM YYYY hh:mm a').format('YYYY-MM-DD');
          console.log(filteredtransactiondate, "filteredtransactiondate");

          if (filteredtransactiondate) {
            return filteredtransactiondate >= this.fromDate &&
              filteredtransactiondate <= this.toDate;
          }
          return false;
        });
      } else {
        Swal.fire({
          title: 'Warning',
          text: 'End date should be later than start date.',
          icon: 'warning'
        });
        // Optionally clear filtered data on date range error
        filteredData = [];
      }
    }

    console.log(filteredData, "filteredData");
    // Update filtered data and totalItems
    this.accountData = filteredData;

    this.totalItems = this.accountData.length;
    this.count = this.totalItems;
    this.page = 1; // Reset to the first page when filtering occurs
  }

  search() { /* handle filter */ }
  reset() { 
    this.fromDate = '';
    this.toDate = '';
    this.getAccountData();
   }

   allData(){
    this.reset();
   }
  filter(type: string) { /* filter by P&L, PDC, etc */ }
  goBack() { /* navigate back */ }
}
