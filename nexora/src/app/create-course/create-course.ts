import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';



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
export class CreateCourseComponent {
  @ViewChild('editorArea') editorArea!: ElementRef<HTMLDivElement>;
    courseData = {
    title: '',
    description: '',
    difficulty: '',
    pricing: ''
  };
  thumbnail :string|null=null;
  video:string | null = null;
  isClick:boolean=false;
  activeFormats = {
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false
  }

  constructor(private router:Router){

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
      this.thumbnail = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  removeThumbnail(){
   this.thumbnail = null;
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

    this.video = file.name;

    if (this.video) {
      URL.revokeObjectURL(this.video);
    }
    this.video = URL.createObjectURL(file);
  }  

  removeVideo(): void {
    if (this.video) {
      URL.revokeObjectURL(this.video);
    }
    this.video = null;
    this.video = null;
  }



  next(){
    this.isClick=true;
    this.router.navigate(['layout/create/add-curriculuam/'])
  }

}
