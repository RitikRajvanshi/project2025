import { Component, ElementRef, Renderer2, ViewChild, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
declare var bootstrap: any; // Declare Bootstrap globally


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  togglelanguagehindi:boolean = true;
  togglelanguageenglish:boolean = false;
  isDropdownOpen: boolean = false;
  userData:any;


  constructor(private renderer: Renderer2,private el: ElementRef, private route:Router, public router:Router, private adminService:AdminService) {

    // const userData:any = localStorage.getItem('user_data');
    // this.userData = JSON.parse(userData);
    this.adminService.userData$.subscribe((data)=>{
      this.userData = data;
      console.log(this.userData, "userdata");
    })
  }


  ngAfterViewInit(): void {
    const currentUrl = this.router.url;
    if(currentUrl.endsWith('/client')){
    const modalEl = document.getElementById('exampleModal');
    if (modalEl) {
      const myModal = new bootstrap.Modal(modalEl);
      myModal.show();
    }
    }
  }
  
  toggleSidebar() {
    const body = this.el.nativeElement.ownerDocument.body;
     body.classList.toggle('toggle-sidebar');
    }

    chooseHindi(){
      this.togglelanguagehindi = true;
      this.togglelanguageenglish = false;
    }

    chooseEnglish(){
      this.togglelanguagehindi = false;
      this.togglelanguageenglish = true;
    }


    openDropdown() {
      console.log("open")
      this.isDropdownOpen = true;
    }
  
    closeDropdown() {
      console.log("close")

      this.isDropdownOpen = false;
    }

    signOut(){
      localStorage.clear();
      this.adminService.updateUserData(null); // Reset BehaviorSubject
      this.route.navigate(['']);
    }
}
