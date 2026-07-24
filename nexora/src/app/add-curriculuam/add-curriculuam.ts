import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-curriculuam',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './add-curriculuam.html',
  styleUrl: './add-curriculuam.scss'
})
export class AddCurriculuamComponent implements OnInit {
  courseData: any = null;
  isModel: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('courseData');
    if (saved) {
      this.courseData = JSON.parse(saved);
    }
  }
  addSection() {
    this.router.navigate(['layout/create/add-section']);
  }
  viewCourse() {
    this.isModel = true;
  }
  closeModel() {
    this.isModel = false;
  }
  editCourse() {
    this.router.navigate(['/layout/create']);
  }
  deleteCourse() {
    localStorage.removeItem('courseData');
    this.courseData = null;
    this.isModel = false;
    this.router.navigate(['/layout/create']);
  }
}