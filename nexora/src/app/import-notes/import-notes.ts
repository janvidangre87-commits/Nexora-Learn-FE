import {Component, computed, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { CourseService } from '../service/course.service';
import { ChapterData, ChapterList, ClassData, Topic } from '../model/course';



export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}



@Component({
  selector: 'app-import-notes',
  standalone: true,
  imports: [FormsModule,MatCheckboxModule],
  templateUrl: './import-notes.html',
  styleUrl: './import-notes.scss'
})
export class ImportNotesComponent {

  constructor(private router:Router, private courseService: CourseService){

  }

   ngOnInit() {
    this.allData = this.courseService.getAllClasses();   
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
       this.availableTopics = this.courseService.getTopicsByChapter(this.availableChapters, this.selectedChapter);
       this.selectedTopics = '';
    }

    onClick(){
      
      this.router.navigate(['layout/create/add-lecture'])
    }

   
  
}
