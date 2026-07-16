import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule, MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { CourseService } from '../service/course.service';
import { ChapterData, ChapterList, ClassData } from '../model/course';



@Component({
  selector: 'app-add-lecture',
  standalone: true,
  imports: [CommonModule,FormsModule, MatIconModule, MatRadioModule],
  templateUrl: './add-lecture.html',
  styleUrl: './add-lecture.scss'
})
export class AddLectureComponent {
  @ViewChild('editorArea') editorArea!: ElementRef<HTMLDivElement>;
  thumbnail :string|null=null;
  video:string | null = null;
  pdf: string|null=null;

  isUpload:boolean=false;
  isImport:boolean=false;

  isClick:boolean=false;
  isModule:boolean=false;
  activeFormats = {
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false
  }
    
  constructor(private router:Router, private courseService: CourseService){}

  ngOnInit() {
    this.allData = this.courseService.getAllClasses();
  }
  

  text(type:string){
    const tool=this.editorArea.nativeElement;
    tool.focus();
    switch(type){
      case 'bold':
        tool.style.fontWeight= tool.style.fontWeight=== 'bold' ? 'normal' :'bold';
        break;
      case 'italic':
        tool.style.fontStyle= tool.style.fontStyle=== 'italic'? 'Inter' :'italic';
        break;
      case 'underline':
        tool.style.textDecorationLine= tool.style.textDecorationLine==='underline'? 'none':'underline'
        break;
    }
  }
  execCmd(command: string, value?: string): void {
    this.editorArea.nativeElement.focus();
    document.execCommand(command, false, value);
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


  onPfdSelect(pdfFile:Event){
    
    const input = pdfFile.target as HTMLInputElement | null;
    if (!input?.files?.length) {
      return;
    }
    let file= input.files[0];
    
    this.pdf =file.name;
    console.log(this.pdf)
  }
  onRadioChange(events: MatRadioChange){
    if (this.isUpload=true) {
      this.isUpload = events.value === '2';
    }
    if (this.isImport=true) {
      this.isImport=events.value=== '1';
    }
  }
  onAdd(){
    this.courseService.setShowContent(true);  
    this.courseService.setContent(this.pdf?? '')
    this.router.navigate(['layout/create/create-new-section'])
  }


  allData: ClassData[] = [];
  selectedClass: string = '';
  selectedSubject: string = '';
  selectedChapter: string = '';

  availableSubjects: ChapterList[] = [];
  availableChapters: ChapterData[] = [];

  onClassChange() {
    this.availableSubjects = this.courseService.getSubjectsByClass(this.selectedClass);
    this.selectedSubject = '';
    this.selectedChapter = '';
    this.availableChapters = [];
  }

  onSubjectChange() {
    this.availableChapters = this.courseService.getChaptersBySubject(this.availableSubjects, this.selectedSubject);
    this.selectedChapter = '';
  }

  next() {
    console.log("next clicked");
    this.router.navigate(['layout/create/import-notes']);
  }
}
