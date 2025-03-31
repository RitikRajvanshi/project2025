import { Component, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  constructor(private renderer: Renderer2,private el: ElementRef) {}
  toggleSidebar() {
    const body = this.el.nativeElement.ownerDocument.body;
     body.classList.toggle('toggle-sidebar');
    }
  
}
