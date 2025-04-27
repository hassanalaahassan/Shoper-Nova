import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'] // صحح styleUrl إلى styleUrls
})
export class SideBarComponent {

  isSideBarOpen:boolean = false

  @ViewChild('sidebar') sideBar:ElementRef = {} as ElementRef
  @ViewChild('toggleBtn') toggleBtn!: ElementRef;


  toggleSidebar():void{
    this.isSideBarOpen = !this.isSideBarOpen
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as Node;
    const clickedToggleBtn = this.toggleBtn?.nativeElement.contains(target);
    const clickedInsideSidebar = this.sideBar?.nativeElement.contains(target);
    if (this.isSideBarOpen && !clickedInsideSidebar && !clickedToggleBtn) {
      this.toggleSidebar();
    }
  }
}
