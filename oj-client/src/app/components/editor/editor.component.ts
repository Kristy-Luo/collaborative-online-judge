import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CollaborationService } from './../../services/collaboration.service';

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
  problemID: string; 

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

  constructor(private collaborationService: CollaborationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.problemID = params.get('id'); 
      console.log("problemID: " + this.problemID);
      this.initEditor(); 
    });
  }
  
  // editor initialization
  initEditor(): void {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor(); 

    // setup socket.io for collaboration 
    this.collaborationService.init(this.problemID, this.editor); 
    this.editor.lastAppliedChange = null; 

    // listen for document changes
    this.editor.on("change", (delta) => {
      if (delta != this.editor.lastAppliedChange) {
        // call collaboration service to emit a change event 
        this.collaborationService.change(JSON.stringify(delta)); 
      }
    }); 
  }

  // reset editor: reset the programming Language and its default content
  resetEditor(): void {
    this.editor.session.setMode("ace/mode/" + this.language.toLowerCase());
    this.editor.setValue(this.defaultContent[this.language]);
  }
  
  // set language 
  setLanguage(): void {
    this.resetEditor(); 
  }

  // submit code 
  submit(): void {
    // get content of the current session
    let user_code = this.editor.getValue(); 
    console.log(user_code);
  }
}
