import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-report-deadmaster',
  templateUrl: './report-deadmaster.component.html',
  styleUrls: ['./report-deadmaster.component.scss']
})
export class ReportDeadmasterComponent {
  logininfo: any;
  users_data: any;
  role: any;

  userhierarchaldata:any;
  adminfromhierarchy:any;
  subadminfromhierarchy:any;
  minadminfromhierarchy:any;
  supermasterfromhierarchy:any;
  masterfromhierarchy:any;
  agentfromhierarchy:any;
  clientsfromhierarchy:any;
  usersdataacctolevelandcreatedby:any;
  levels:any;

  constructor(private http:HttpClient){
    this.logininfo = localStorage.getItem('user_data');
  }

  ngOnInit(){
    this.getloginuserinfo(this.logininfo);
    this.getlevel();
  }

  ngAfterViewInit(){
    
  }

  getloginuserinfo(data:any) {
    const url = environment.ADMIN_URL + environment.ADMIN.GET_USER_DATA;
      const UserId = {
        user_id: + data
      }

      this.http.post<any>(url, UserId).subscribe((results: any) => {
        // console.log(results[0].created_by, "results");
        this.users_data = results[0];
        this.role = results[0].level;
        this.gethierarhchaldata(results[0]);

      })
   
  }

  getusersdata(level:any, created_by:any){
    const createdby={
      created_by:created_by
    }
    const url = environment.ADMIN_URL + environment.ADMIN.GET_USERS_HIERARCHICAL_DATA;

    this.http.post(url,createdby).subscribe((results:any)=>{
      console.log(results,"reslut");
      this.usersdataacctolevelandcreatedby = results.filter((e:any)=>{
        return e.level == level && e.status ==0;
      })
      // console.log(this.usersdataacctolevelandcreatedby, "this.usersdataacctolevelandcreatedby");

    })


  }




  getlevel(){
    const url = environment.ADMIN_URL + environment.ADMIN.GETLEVEL;
    this.http.get(url).subscribe((results:any)=>{
      // this.levels = results;

      setTimeout(() => {
        this.levels = results.filter((e:any)=>e.level_id > this.role).sort((a:any,b:any)=>
          a.level_id - b.level_id
        )
      }, 500);
 
    })
    
  }

  getusersdataacctolevel(event: any){

    console.log(event, "heellloooo");
    // const selectedIndex = event.target.selectedIndex;

    // if (selectedIndex !== -1) {
    //   const selectedData = this.levels[selectedIndex];
    //   console.log(selectedData); // This will log the selected data object
    //   // Now you can use the selectedData object as needed
    // this.getusersdata(selectedData.level_id, this.users_data.created_by);

    // }

    this.getusersdata(event, this.users_data.user_id);
    
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


}
