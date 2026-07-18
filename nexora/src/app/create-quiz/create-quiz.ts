import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CourseService } from '../service/course.service';
import { ChapterData, ChapterList, ClassData, Question, Topic } from '../model/course';
import { MatCheckbox, MatCheckboxChange } from "@angular/material/checkbox";
import { MatRadioButton } from '@angular/material/radio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  imports: [MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatRadioButton, MatCheckbox],
  templateUrl: './create-quiz.html',
  styleUrl: './create-quiz.scss',
})
export class CreateQuiz implements OnInit{
  myControl = new FormControl('MCQ');
  options: string[] = ['MCQ', 'True/False', 'Numerical','Short Answer','Fill in the blancks'];
  filteredOptions: Observable<string[]>;
  questions:Question[]=[];
  selectedQue:Question[]|null=null;

  selectedType: string = 'MCQ';  
  currentOptions: string[] = ['', '', '', ''];   
  correctAnswer: any = null;
  uploadToQuestionSet: boolean = false;

  constructor(private courseService:CourseService, private router:Router ) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith('MCQ'),
      map((value) => this._filter(value || '')),
    );
  }
  ngOnInit(): void {
    this.allData = this.courseService.getAllClasses();  
    this.questions=this.courseService.getQuestions();
     this.myControl.valueChanges.subscribe(value => {
    if (this.options.includes(value ?? '')) {
      this.selectedType = value as string;
      this.resetFields();
    }
  });
  }

  resetFields() {
  this.currentOptions = ['', '', '', ''];
  this.correctAnswer = null;
  }

  

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }
 @ViewChild('editorArea') editorArea!: ElementRef<any>;
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


  addQuestion() {
  let newQuestion: Question;
    
  switch (this.selectedType) {
    case 'MCQ':
      newQuestion = {
        id: this.questions.length + 1,
        type: 'mcq',
        questionText: '',
        options: ['', '', '', '']
      };
      break;

    case 'True/False':
      newQuestion = {
        id: this.questions.length + 1,
        type: 'true-false',
        questionText: '',
        correctAnswer: undefined
      };
      break;

    case 'Numerical':
      newQuestion = {
        id: this.questions.length + 1,
        type: 'numerical',
        questionText: '',
        correctAnswer: undefined
      };
      break;

    case 'Short Answer':
      newQuestion = {
        id: this.questions.length + 1,
        type: 'short-answer',
        questionText: '',
        correctAnswer: ''
      };
      break;

    case 'Fill in the blancks':
      newQuestion = {
        id: this.questions.length + 1,
        type: 'fill-blanks',
        questionText: '',
        correctAnswer: ''
      };
      break;

    default:
      return;
  }

  this.questions.push(newQuestion);
  this.selectedQue = [newQuestion];
  }
  onChecked(event: MatCheckboxChange) {
    console.log('Checked:', event.checked);
    this.uploadToQuestionSet = event.checked;
  }


  allData: ClassData[] = [];
    
  
  selectedClass: string = '';
  selectedSubject: string = '';
  selectedChapter: string = '';
  selectedTopics:string = '';
  selectedTopicContent: string = '';
  isChecked: boolean = false;
    
  availableSubjects: ChapterList[] = [];
  availableChapters: ChapterData[] = [];
  availableTopics: Topic[]=[]
    
  onClassChange() {
    this.availableSubjects = this.courseService.getSubjectsByClass(this.selectedClass);
    this.selectedSubject = '';
    this.selectedChapter = '';
    this.selectedTopics='';
    this.availableChapters = [];
    this.availableTopics=[];
  }
    
    onSubjectChange() {
      this.availableChapters = this.courseService.getChaptersBySubject(this.availableSubjects, this.selectedSubject);
      this.selectedChapter = '';
      this.selectedTopics='';
      this.availableTopics=[];  
      this.availableTopics = [];
    }
  
    onChapterChange(){
       this.availableTopics = this.courseService.getTopicsByChapter(this.availableChapters, this.selectedChapter);         this.selectedTopics = '';
    }
  
    onUpload(){
      this.router.navigate(['layout/create/create-new-section'])
    }

}
