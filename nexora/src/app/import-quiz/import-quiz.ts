import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import-quiz',
  imports: [
    
   CommonModule,
    FormsModule,
    MatCheckbox,
    MatIcon
  ],
  templateUrl: './import-quiz.html',
  styleUrl: './import-quiz.scss',
})
export class ImportQuiz {
  constructor(private router: Router) {}
  selectedQuestions: any[] = [];

  isContinue = false;

  continue() {
    this.isContinue = true;
  }

  

  classList = ['Class 8', 'Class 9', 'Class 10'];
  subjectList = ['Math', 'Science', 'English'];
  chapterList = ['Chapter 1', 'Chapter 2', 'Chapter 3'];

  selectedClass = '';
  selectedSubject = '';
  selectedChapter = '';
  selectedType = 'MCQ';

  selectType = ['MCQ', 'True/False', 'Numerical', 'Short']

  mcqQuestions = [
    {
      question: 'What is the SI unit of speed?',
      options: ['Meter', 'Kilogram', 'm/s', 'Second'],
      marks: 2,
      exam: '...',
      ans: '1) m/s',
     subject: 'physics',
     topic: 'motion',
     difficulty: 'Easy',
     explantion: 'Speed is measured in meters per second because it represents how many meters an object travels in one second.',
     class:'11'

    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
      marks: 2,
      subject: 'physics',
      ans: 'Mars',
     topic: 'motion',
     difficulty: 'Easy',
     explantion: 'Speed is measured in meters per second because it represents how many meters an object travels in one second.',
     class:'11'
    }
  ];

  mcqOption =[ 'A', 'B','C', 'D'];


  trueFalseQuestions = [
  {
    question: 'The Earth revolves around the Sun.',
    options: ['True', 'False'],
    ans: 'True',
    marks: 1,
    exam: '...',
    subject: 'Science',
    topic: 'Solar System',
    difficulty: 'Easy',
    explantion: 'The Earth revolves around the Sun once every 365.25 days.',
    class: '6'
  },
  {
    question: 'Water boils at 50°C under normal atmospheric pressure.',
    options: ['True', 'False'],
    ans: 'False',
    marks: 1,
    exam: '...',
    subject: 'Science',
    topic: 'Matter',
    difficulty: 'Easy',
    explantion: 'Water boils at 100°C at normal atmospheric pressure.',
    class: '7'
  },

  {
    question: 'The SI unit of force is Newton.',
    options: ['True', 'False'],
    ans: 'True',
    marks: 1,
    exam: '...',
    subject: 'Physics',
    topic: 'Force',
    difficulty: 'Easy',
    explantion: 'Force is measured in Newton (N).',
    class: '11'
  }
];

numericalQuestions = [
  {
    question: 'A car travels 180 km in 3 hours. Calculate its speed.',
    ans: '60 km/h',
    marks: 5,
    exam: 'Board Exam',
    subject: 'Physics',
    topic: 'Motion',
    difficulty: 'Easy',
    explantion: 'Speed = Distance ÷ Time = 180 ÷ 3 = 60 km/h.',
    class: '11'
  },
  {
    question: 'A train moves at a speed of 25 m/s for 20 seconds. Find the distance travelled.',
    ans: '500 m',
    marks: 5,
    exam: 'Board Exam',
    subject: 'Physics',
    topic: 'Motion',
    difficulty: 'Easy',
    explantion: 'Distance = Speed × Time = 25 × 20 = 500 m.',
    class: '11'
  },
  {
    question: 'A bike accelerates from 10 m/s to 30 m/s in 5 seconds. Calculate the acceleration.',
    ans: '4 m/s²',
    marks: 5,
    exam: 'JEE',
    subject: 'Physics',
    topic: 'Motion',
    difficulty: 'Medium',
    explantion: 'Acceleration = (30 − 10) ÷ 5 = 4 m/s².',
    class: '11'
  },
  {
    question: 'A body travels 240 m in 12 seconds. Find its speed.',
    ans: '20 m/s',
    marks: 5,
    exam: 'NEET',
    subject: 'Physics',
    topic: 'Motion',
    difficulty: 'Easy',
    explantion: 'Speed = Distance ÷ Time = 240 ÷ 12 = 20 m/s.',
    class: '11'
  }
];


shortQuestions = [
  {
    question: 'Define speed.',
    ans: 'Speed is the distance travelled by an object per unit time.',
    marks: 2,
    exam: 'Board Exam',
    subject: 'Physics',
    topic: 'Motion',
    difficulty: 'Easy',
    explantion: 'Speed tells us how fast an object is moving.',
    class: '11'
  },
  {
    question: 'What is the SI unit of velocity?',
    ans: 'm/s (meter per second)',
    marks: 2,
    exam: 'Board Exam',
    subject: 'Physics',
    topic: 'Motion',
    difficulty: 'Easy',
    explantion: 'The SI unit of velocity is meter per second (m/s).',
    class: '11'
  },
  {
    question: 'State Newton’s First Law of Motion.',
    ans: 'A body remains at rest or in uniform motion unless acted upon by an external force.',
    marks: 3,
    exam: 'JEE',
    subject: 'Physics',
    topic: 'Laws of Motion',
    difficulty: 'Medium',
    explantion: 'This law is also known as the law of inertia.',
    class: '11'
  },
  {
    question: 'What is acceleration?',
    ans: 'Acceleration is the rate of change of velocity with respect to time.',
    marks: 2,
    exam: 'NEET',
    subject: 'Physics',
    topic: 'Motion',
    difficulty: 'Easy',
    explantion: 'Acceleration measures how quickly velocity changes.',
    class: '11'
  }
];




showPopup = false;
selectedQuestion: any;

  delete(index: number) {
      if (this.selectedType === 'MCQ') {
    this.mcqQuestions.splice(index, 1);
  } else if (this.selectedType === 'True/False') {
    this.trueFalseQuestions.splice(index, 1);
  } else if (this.selectedType === 'Numerical') {
    this.numericalQuestions.splice(index, 1);
  } else if (this.selectedType === 'Short') {
    this.shortQuestions.splice(index, 1);
  }


  }

openPopup(question: any) {
  this.selectedQuestion = question;
  this.showPopup = true;
}

closePopup() {
  this.showPopup = false;
}


toggleSelect(question: any, event: any) {
    if (event.checked) {
      this.selectedQuestions.push({ ...question, type: this.selectedType });
    } else {
      this.selectedQuestions = this.selectedQuestions.filter(q => q !== question);
    }
  }

  addSelectedQuestions() {
    this.router.navigate(['layout/create/create-new-section'], {
      state: { questions: this.selectedQuestions }
    });
  }



}
