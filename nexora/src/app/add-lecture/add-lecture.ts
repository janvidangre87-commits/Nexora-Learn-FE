import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule, MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { CourseService } from '../service/course.service';
import { ChapterData, ChapterList, ClassData, Topic } from '../model/course';

@Component({
  selector: 'app-add-lecture',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatRadioModule],
  templateUrl: './add-lecture.html',
  styleUrl: './add-lecture.scss',
})
export class AddLectureComponent {
  @ViewChild('editorArea') editorArea!: ElementRef<HTMLDivElement>;

  lectureData = {
    title: '',
    discription: '',
    thumbnail: '',
    video: '',
    pdf: '',
    sHour: null,
    sMin: null,
    sSec: null,
    eHour: null,
    eMin: null,
    eSec: null,
  };

  isUpload: boolean = false;
  isImport: boolean = false;
  isClick: boolean = false;
  isModule: boolean = false;
  isShowImport: boolean = false;
  selectedTopics: Topic[] = [];

  activeFormats = {
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
  };

  constructor(
    private router: Router,
    private courseService: CourseService,
  ) {}

  ngOnInit() {
    const data = localStorage.getItem('selectedTopics');
    if (data) {
      this.selectedTopics = JSON.parse(data);
    }
    this.isShowImport = this.courseService.getShowImport();
    this.allData = this.courseService.getAllClasses();
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
  thumbnailError = '';

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input?.files?.length) {
      this.thumbnailError = 'Image recquired';
      this.lectureData.thumbnail = '';
      return;
    }

    const file = input.files[0];
    console.log(file.name);

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      this.thumbnailError = 'Image size must be less than 2 MB.';
      this.lectureData.thumbnail = '';
      input.value = '';
      return;
    }

    this.thumbnailError = '';

    const reader = new FileReader();
    reader.onload = () => {
      this.lectureData.thumbnail = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  removeThumbnail() {
    this.lectureData.thumbnail = '';
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

    this.lectureData.video = file.name;

    if (this.lectureData.video) {
      URL.revokeObjectURL(this.lectureData.video);
    }
    this.lectureData.video = URL.createObjectURL(file);
  }

  removeVideo(): void {
    if (this.lectureData.video) {
      URL.revokeObjectURL(this.lectureData.video);
    }
    this.lectureData.video = '';
  }

  onPfdSelect(pdfFile: Event) {
    const input = pdfFile.target as HTMLInputElement | null;
    if (!input?.files?.length) {
      return;
    }
    let file = input.files[0];

    this.lectureData.pdf = file.name;
    console.log(this.lectureData.pdf);
  }
  onRadioChange(events: MatRadioChange) {
    if ((this.isUpload = true)) {
      this.isUpload = events.value === '2';
    }
    if ((this.isImport = true)) {
      this.isImport = events.value === '1';
    }
  }
  onAdd() {
    this.lectureData.discription = this.editorArea.nativeElement.innerHTML;
    localStorage.setItem('lectureData', JSON.stringify(this.lectureData));
    console.log(this.lectureData);
    this.courseService.setShowContent(true);
    this.courseService.setContent(this.lectureData.pdf ?? '');
    this.router.navigate(['layout/create/create-new-section']);
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
    this.availableChapters = this.courseService.getChaptersBySubject(
      this.availableSubjects,
      this.selectedSubject,
    );
    this.selectedChapter = '';
  }

  next() {
    const select = {
      class: this.selectedClass,
      subject: this.selectedChapter,
      chapter: this.selectedChapter,
    };
    localStorage.setItem('select', JSON.stringify(select));
    console.log('next clicked');
    this.router.navigate(['layout/create/import-notes']);
  }

  onAddlecture() {
    this.router.navigate(['layout/create/create-new-section']);
  }

}
