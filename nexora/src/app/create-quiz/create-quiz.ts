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
import { Question } from '../model/course';
import { MatCheckbox } from "@angular/material/checkbox";

@Component({
  selector: 'app-create-quiz',
  imports: [MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatCheckbox],
  templateUrl: './create-quiz.html',
  styleUrl: './create-quiz.scss',
})
export class CreateQuiz implements OnInit{
  myControl = new FormControl('MCQ');
  options: string[] = ['MCQ', 'True/False', 'Numerical','Short Answer','Fill in the blancks','Discriptive'];
  filteredOptions: Observable<string[]>;
  questions:Question[]=[];
  selectedQue:Question[]|null=null;
  constructor(private course:CourseService ) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith('MCQ'),
      map((value) => this._filter(value || '')),
    );
  }
  ngOnInit(): void {
    this.questions=this.course.getQuestions();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }
  @ViewChild('editorArea') editorArea!: ElementRef<HTMLTextAreaElement>;

  text(type: string) {
    const tool = this.editorArea.nativeElement;
    tool.focus();
    switch (type) {
      case 'bold':
        tool.style.fontWeight = tool.style.fontWeight === 'bold' ? 'normal' : 'bold';
        break;
      case 'italic':
        tool.style.fontStyle = tool.style.fontStyle === 'italic' ? 'Inter' : 'italic';
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

  module() {}
}
