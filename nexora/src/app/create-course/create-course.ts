import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCardModule,
    MatRadioModule,
    RouterOutlet
],
  templateUrl: './create-course.html',
  styleUrls: ['./create-course.scss']
})
export class CreateCourseComponent implements OnInit {
  @ViewChild('editorArea') editorArea!: ElementRef<HTMLDivElement>;
    courseData = {
    title: '',
    description: '',
    difficulty: 'Easy',
    isPublic:false,
    isQA:false,
    visibility:'Public',
    pricing: '',
    pricingType:'',
    scheduleDate: '',
    scheduleTime: '',
    cateogry:'Public',
    tags:'Public',
    thumbnail :'',
    video:''
  };
  showForm:boolean = true;
  
  isSchedule:boolean=false;
  isModel:boolean=false;
  plan:string=''
  pricingOffer=['One time pricing only','Subscription only', 'subscription and one time purchase','Membership only']
  activeFormats = {
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false
  }

  constructor(private router:Router){
    
  }

  ngOnInit() {
     this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.showForm = this.router.url === '/layout/create';
    });

  this.showForm = this.router.url === '/layout/create';
    const data = localStorage.getItem('courseData');
    if (data) {
      this.courseData = JSON.parse(data);
     setTimeout(() => {
      if (this.editorArea) {
        this.editorArea.nativeElement.innerHTML =
          this.courseData.description || '';
      }
    });
    }
  }
    
  text(type: string) {
    const tool = this.editorArea.nativeElement;
    tool.focus();
    switch (type) {
      case 'bold':
        tool.style.fontWeight = tool.style.fontWeight === 'bold' ? 'normal' : 'bold';
        break;
      case 'italic':
        tool.style.fontStyle = tool.style.fontStyle === 'italic' ? 'normal' : 'italic'; 
        break;
      case 'underline':
        tool.style.textDecorationLine =
          tool.style.textDecorationLine === 'underline' ? 'none' : 'underline';
        break;
    }
  }
  execCmd(command: string, value?: string): void {
    this.editorArea.nativeElement.focus();
    document.execCommand(command, false, value);
  }
  insertLink() {
    const url = prompt('Enter the URL:', 'https://');
    if (url) {
      this.execCmd('createLink', url);
    }
  }
  insertImage() {
    const url = prompt('Enter the image URL:');
    if (url) {
      this.execCmd('insertImage', url);
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input?.files?.length) {
      return;
    }

    const file = input.files[0];
    console.log(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      this.courseData.thumbnail = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  removeThumbnail(){
   this.courseData.thumbnail= '';
  }


  onVideoSelect(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input?.files?.length) {
      return;
    }

    const file = input.files[0];
    if (!file.type.startsWith('video/')) {
      console.warn('Please select a valid video file');
      return;
    }

    this.courseData.video = file.name;

    if (this.courseData.video) {
      URL.revokeObjectURL(this.courseData.video);
    }
    this.courseData.video = URL.createObjectURL(file);
  }  

  removeVideo(): void {
    if (this.courseData.video) {
      URL.revokeObjectURL(this.courseData.video);
    }
    this.courseData.video = '';
  }
  
 next() {
    this.courseData.description = this.editorArea.nativeElement.innerHTML;
    localStorage.setItem('courseData', JSON.stringify(this.courseData));
    console.log(this.courseData);
    this.router.navigate(['layout/create/add-curriculuam/']);
  }

  deleteCourse() {
    localStorage.removeItem('courseData');
    this.courseData = {
      title: '',
      description: '',
      difficulty: 'Easy',
      isPublic: false,
      isQA: false,
      visibility: 'Public',
      pricing: '',
      pricingType:'',
      scheduleDate: '',
      scheduleTime: '',
      cateogry: 'Public',
      tags: 'Public',
      thumbnail :'',
      video:''
    };
    if (this.editorArea) {
      this.editorArea.nativeElement.innerHTML = '';
    }
  }
  edit(){
    this.editorArea.nativeElement.innerHTML;
    this.isModel=true
  }
  
}
