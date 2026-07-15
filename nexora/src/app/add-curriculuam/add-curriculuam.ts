import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-curriculuam',
  standalone: true,
  imports: [CommonModule, MatIconModule,],
  templateUrl: './add-curriculuam.html',
  styleUrl: './add-curriculuam.scss'
})
export class AddCurriculuamComponent {

  constructor(private router:Router){

  }

  addSection(){
    this.router.navigate(['layout/create/add-section'])
  }

}
