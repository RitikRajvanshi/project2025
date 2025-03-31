import { Component, ElementRef, Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
declare var $:any
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  users_data:any;
  role:any;
  isSidebarVisible = false;
  constructor(public router:Router, private renderer: Renderer2,private el: ElementRef,public http:HttpClient) {}

  ngOnInit(){
    this.userdata();
    
  }

  ngAfterViewInit(){
  }

  userdata(){
    // if(localStorage.getItem('user_data')){
      const user_data = localStorage.getItem('user_data');
      const url = environment.ADMIN_URL + environment.ADMIN.GET_USER_DATA;
      if(user_data){
      const UserId ={
        user_id:+ user_data
      }
      this.http.post<any>(url,UserId).subscribe((results:any)=>{
        console.log(results, "results");
        this.users_data = results[0];
      this.role = results[0].level; 
      })
    }
    // }
  }




  toggleSidebar() {
   const body = this.el.nativeElement.ownerDocument.body;
    body.classList.toggle('toggle-sidebar');
   }


  signout(){
    alert("Do You really want to logout?? ");
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
function on(arg0: string, arg1: string, arg2: (e: any) => void) {
  throw new Error('Function not implemented.');
}

