import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

interface Sublist{
  label:string,
  route:string
}

interface Navlist{
  label:string,
  icon:string,
  route?:string,
  expanded?:boolean,
  children?:Sublist[],
}


@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatIcon, RouterLink],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss'
})
export class SideNavComponent {

  @Output() hoverChange = new EventEmitter<boolean>();
  expanded = false;

  navlist:Navlist[]=[

  { label: 'Dashboard', icon: 'grid_view', route: '' },
  { label: 'Users', icon: 'group', route: '' },
  {
    label: 'LMS',
    icon: 'school',
    expanded: true, 
    children: [
      { label: 'Courses', route: 'create' },
      { label: 'Content bank', route: '' },
      { label: 'Categories', route: '' },
      { label: 'Tags', route: '' },
      { label: 'Coupons', route: '' },
      { label: 'Students', route: '' },
      { label: 'Announcement', route: '' },
      { label: 'Quiz Attempts', route: '' },
      { label: 'Enrollment', route: '' }
      ]
    } ,
    { label: 'Bulk Upload', icon: 'upload_file', route: '' },
    { label: 'Orders', icon: 'receipt_long', route: '' },
    { label: 'Scription', icon: 'credit_card', route: '' },
    { label: 'Payment', icon: 'account_balance_wallet', route: '' },
  ]


    onMouseEnter(): void {
    this.expanded = true;
    this.hoverChange.emit(true);
  }

  onMouseLeave(): void {
    this.expanded = false;
    this.hoverChange.emit(false);
  }
  
  toogle(link:Navlist){
    if(link.children){
      link.expanded=!link.expanded
    }
  }

}