import { Component, ElementRef, Renderer2, ViewChild, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  togglelanguagehindi:boolean = true;
  togglelanguageenglish:boolean = false;
  isDropdownOpen: boolean = false;


  constructor(private renderer: Renderer2,private el: ElementRef) {}
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
}
