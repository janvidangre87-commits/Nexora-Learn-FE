import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
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
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';

import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-create-quiz',
  imports: [MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatRadioButton, MatCheckbox, MatExpansionModule, MatSlideToggleModule, MatRadioGroup],
  templateUrl: './create-quiz.html',
  styleUrl: './create-quiz.scss',
})
export class CreateQuiz implements OnInit{
  @ViewChild('editorArea') editorArea!: ElementRef<any>;
  quiz={
    title:'',
    distription:'',
  }


  myControl = new FormControl('MCQ');
  options: string[] = ['MCQ', 'True/False', 'Numerical', 'Short Answer', 'Fill in the blancks'];
  filteredOptions: Observable<string[]>;
  questions: Question[] = [];
  selectedQue: Question[] | null = null;

  selectedType: string = 'MCQ';
  currentOptions: string[] = ['', '', '', ''];
  correctAnswer: any = null;
  uploadToQuestionSet: boolean = false;
  isSetting: boolean = false;
  selectedIndex: number = -1;
  showOptionError = false;
  showAnswerError = false;
  titleError = false;
  title = '';

  readonly panelOpenState = signal(false);

  constructor(private courseService: CourseService, private router: Router) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith('MCQ'),
      map((value) => this._filter(value || '')),
    );
  }
  ngOnInit(): void {
    this.allData = this.courseService.getAllClasses();
    this.questions = this.courseService.getQuestions();
    this.myControl.valueChanges.subscribe(value => {
      if (this.options.includes(value ?? '')) {
        this.selectedType = value as string;
        this.resetFields();
      }
    });
  }

  onSetting() {
    this.isSetting = true
  }

  resetFields() {
    this.currentOptions = ['', '', '', ''];
    this.correctAnswer = null;
  }

  onOk(){
    this.quiz.distription=this.editorArea.nativeElement.innerHTML;
    localStorage.setItem('quiz',JSON.stringify(this.quiz));
    console.log(this.quiz)
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

  currentQuestion: any = {
    id: 0,
    type: 'MCQ',
    questionText: '',
    description: '',
    answerDescription: '',
    options: ['', '', '', ''],
    correctAnswer: null
  };
  selectQuestion(q: any, index: number) {
   
    this.selectedIndex = index;
    this.currentQuestion = {
      ...q,
      options: [...q.options]
    };
    this.selectedType = q.type;

    if (q.type === 'MCQ') {
      this.currentOptions = [...q.options];
      this.correctAnswer = this.currentOptions.indexOf(q.correctAnswer);
    } else {
      this.currentOptions = ['', '', '', ''];
      this.correctAnswer = q.correctAnswer;
    }
  }


  addQuestion() {

    this.showOptionError = false;
    this.showAnswerError = false;


    if (this.selectedType === 'MCQ') {
      this.showOptionError = this.currentOptions.some(
        option => !option || option.trim() === ''
      );

      if (this.showOptionError) {
        return;
      }
    }

    if (
      this.correctAnswer === null ||
      this.correctAnswer === '' ||
      (typeof this.correctAnswer === 'string' &&
        this.correctAnswer.trim() === '')
    ) {
      this.showAnswerError = true;
      return;
    }

    this.currentQuestion.id = this.questions.length + 1;
    this.currentQuestion.type = this.selectedType;

    if (this.selectedType === 'MCQ') {
      this.currentQuestion.options = [...this.currentOptions];
      this.currentQuestion.correctAnswer =
        this.currentOptions[this.correctAnswer];
    } else {
      this.currentQuestion.options = [];
      this.currentQuestion.correctAnswer = this.correctAnswer;
    }

    this.questions.push({
      ...this.currentQuestion,
      options: [...this.currentOptions]
    });


    localStorage.setItem('questions', JSON.stringify(this.questions));
    console.log('All Questions:', this.questions);

    this.currentQuestion = {
      id: 0,
      type: this.selectedType,
      questionText: '',
      description: '',
      answerDescription: '',
      options: ['', '', '', ''],
      correctAnswer: null
    };

    this.currentOptions = ['', '', '', ''];
    this.correctAnswer = null;
  }
  onChecked(event: MatCheckboxChange) {
    console.log('Checked:', event.checked);
    this.uploadToQuestionSet = event.checked;
  }


  allData: ClassData[] = [];


  selectedClass: string = '';
  selectedSubject: string = '';
  selectedChapter: string = '';
  selectedTopics: string = '';
  selectedTopicContent: string = '';
  isChecked: boolean = false;

  availableSubjects: ChapterList[] = [];
  availableChapters: ChapterData[] = [];
  availableTopics: Topic[] = []

  onClassChange() {
    this.availableSubjects = this.courseService.getSubjectsByClass(this.selectedClass);
    this.selectedSubject = '';
    this.selectedChapter = '';
    this.selectedTopics = '';
    this.availableChapters = [];
    this.availableTopics = [];
  }

  onSubjectChange() {
    this.availableChapters = this.courseService.getChaptersBySubject(this.availableSubjects, this.selectedSubject);
    this.selectedChapter = '';
    this.selectedTopics = '';
    this.availableTopics = [];
    this.availableTopics = [];
  }

  onChapterChange() {
    this.availableTopics = this.courseService.getTopicsByChapter(this.availableChapters, this.selectedChapter); this.selectedTopics = '';
  }

  onUpload() {
    this.router.navigate(['layout/create/create-new-section'])
  }

  deleteQuestion() {

    if (this.selectedIndex === -1) {
      console.log("question is not selected");
      return;
    }

    this.questions.splice(this.selectedIndex, 1);

    localStorage.setItem('questions', JSON.stringify(this.questions));

    this.selectedIndex = -1;

    this.currentQuestion = {
      id: 0,
      type: this.selectedType,
      questionText: '',
      description: '',
      answerDescription: '',
      options: ['', '', '', ''],
      correctAnswer: null
    };

    this.currentOptions = ['', '', '', ''];
    this.correctAnswer = null;
    this.showOptionError = false;
    this.showAnswerError = false;

  }

}
