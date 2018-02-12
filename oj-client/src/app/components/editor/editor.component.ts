import { Component, OnInit } from '@angular/core';

declare var ace: any; 
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor: any; 
  languages: string[] = ['Java', 'Python']; 
  language: string = 'Java'; // default language 

  defaultContent = {
    'Java': `public class Example {
      public static void main(String[] args) {
        // Type your Java code here.
      }
    }`,
    'Python': `class Solution:
      def example():
        # write your python code here.
    `
  };

  constructor() { }

  ngOnInit() {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor(); 
  }
  
  // Reset editor: called on init and responds to the Reset button's click event 
  resetEditor() {
    this.editor.session.setMode("ace/mode/" + this.language.toLowerCase());
    this.editor.setValue(this.defaultContent[this.language]);
  }
  
  /*
  setLanguage(language: string): void {
    console.log(this.language);
    this.resetEditor(); 
  }
  */

  // Submit: execute once submit button is clicked 
  submit(): void {
    // get the current session's content
    let user_code = this.editor.getValue(); 
    console.log(user_code);
  }
}
