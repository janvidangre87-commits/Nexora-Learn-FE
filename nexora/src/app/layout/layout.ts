import { Component } from '@angular/core';
import {  SideNavComponent } from '../side-nav/side-nav';

import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ SideNavComponent, RouterOutlet ,Header],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})

export class LayoutComponent {
  isExpand:boolean=false;
    toggleSidebar(): void {
    this.isExpand = !this.isExpand;
  }

}
