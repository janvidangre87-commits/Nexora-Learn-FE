import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-section',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './add-section.html',
  styleUrl: './add-section.scss'
})
export class AddSectionComponent {
   @ViewChild('editorArea') editorArea!: ElementRef<HTMLTextAreaElement>;

    isModule:boolean=false;
    activeFormats = {
      bold: false,
      italic: false,
      underline: false,
      strikeThrough: false
    }
  
    constructor(private router:Router){
  
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

    module(){
      this.isModule=true
      this.router.navigate(['layout/create/create-new-section'])
    }
    addLecture(){
      this.router.navigate(['layout/create/add-lecture'])
    }
}
