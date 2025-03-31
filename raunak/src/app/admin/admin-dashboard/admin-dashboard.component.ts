import { Component, HostListener, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
// declare var $:any;
// "use strict";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  @ViewChild('sidebarButton', { static: false }) sidebarButton!: ElementRef;
  logininfo: any;
  users_data: any;
  role: any;
  adminfromhierarchy: any;
  subadminfromhierarchy: any;
  minadminfromhierarchy: any;
  supermasterfromhierarchy: any;
  masterfromhierarchy: any;
  agentfromhierarchy: any;
  clientsfromhierarchy: any;
  hidesidebarToogle: boolean = false;
  userhierarchaldata: any;

  constructor(private renderer: Renderer2, private http: HttpClient) {
    this.logininfo = localStorage.getItem('user_data');
  }

  ngOnInit() {
    this.getloginuserinfo();
  }

  getloginuserinfo() {
    const url = environment.ADMIN_URL + environment.ADMIN.GET_USER_DATA;
    if (this.logininfo) {
      const UserId = {
        user_id: + this.logininfo
      }
      this.http.post<any>(url, UserId).subscribe((results: any) => {
        console.log(results, "results");
        this.users_data = results[0];
        this.role = results[0].level;
        this.gethierarhchaldata(results[0]);

      })
    }
  }

  gethierarhchaldata(createdby: any) {
    // console.log(this.users_data[0], "createdby");
    const url = environment.ADMIN_URL + environment.ADMIN.GET_USERS_HIERARCHICAL_DATA;
    console.log(url, "URL")
    this.http.post<any>(url, createdby).subscribe((results: any) => {
      console.log(results, "gethierarhchaldata");
      this.userhierarchaldata = results;
      
      this.adminfromhierarchy = results.filter((data: any) => {
        return data.level == 1;
      });

      this.subadminfromhierarchy = results.filter((data: any) => {
        return data.level == 2;
      });

      this.minadminfromhierarchy = results.filter((data: any) => {
        return data.level == 3;
      });

      this.supermasterfromhierarchy = results.filter((data: any) => {
        return data.level == 4;
      });

      this.masterfromhierarchy = results.filter((data: any) => {
        return data.level == 5;
      });

      this.agentfromhierarchy = results.filter((data: any) => {
        return data.level == 6;
      });

      this.clientsfromhierarchy = results.filter((data: any) => {
        return data.level == 7;
      });

      console.log(this.userhierarchaldata, "this.userhierarchaldata");
    })

  }



  SideBarToggle() {
    this.hidesidebarToogle = !this.hidesidebarToogle
  }


}
