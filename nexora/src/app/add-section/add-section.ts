import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-section',
  standalone: true,
  imports: [MatIconModule,FormsModule],
  templateUrl: './add-section.html',
  styleUrl: './add-section.scss'
})
export class AddSectionComponent {
   @ViewChild('editorArea') editorArea!: ElementRef<HTMLTextAreaElement>;

    sectionData = {
      title: '',
    };

    isModule:boolean=false;
    activeFormats = {
      bold: false,
      italic: false,
      underline: false,
      strikeThrough: false
    }
sectionForm: any;
  
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

    module(){
      this.isModule=true
      this.router.navigate(['layout/create/create-new-section'])
    }
}
