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
  
  lectureData:any = '';
  isShowContent: boolean = false;
  pdfName: string = '';
  selectedQuestions: any[] = [];

   constructor(private router:Router,private courseservice:CourseService){}
  ngOnInit(): void {
    this.isShowContent=this.courseservice.getShowContent();
    this.pdfName=this.courseservice.getContentData();
    this.selectedQuestions = history.state?.questions ?? []; 
     const saved = localStorage.getItem('lectureData');
    
    if (saved) {
      this.lectureData = JSON.parse(saved);   
      console.log(this.lectureData);           
    }
  }
  addLecture(){
    this.router.navigate(['layout/create/add-lecture'])
  }

  onQuziClick(){
    this.router.navigate(['layout/create/create-quiz'])
  }

  importQuiz() {
    this.router.navigate(['layout/create/import-quiz'])
  }

  deleteQuestion(index : number) {
    this.selectedQuestions.splice(index, 1);
  }

  ondel(){
    this.isShowContent=false
  }
}
