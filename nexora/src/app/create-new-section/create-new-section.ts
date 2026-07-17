import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-create-new-section',
  imports: [MatIconModule],
  templateUrl: './create-new-section.html',
  styleUrl: './create-new-section.scss',
})
export class CreateNewSection implements OnInit{
  @Input() title:string ='';
  
  isShowContent: boolean = false;
  pdfName: string = '';

   constructor(private router:Router,private courseservice:CourseService){}
  ngOnInit(): void {
    this.isShowContent=this.courseservice.getShowContent();
    this.pdfName=this.courseservice.getContentData();
  }

   
  addLecture(){
    this.router.navigate(['layout/create/add-lecture'])
  }

  onQuziClick(){
    this.router.navigate(['layout/create/create-quiz'])
  }
}
