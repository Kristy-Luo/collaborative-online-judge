import { Component, OnInit } from '@angular/core';
import { CollaborationService } from './../../services/collaboration.service';
import { ActivatedRoute, Params } from '@angular/router';

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
  sessionId: string;

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

  constructor(private collaborationService: CollaborationService, private route: ActivatedRoute) { }

  ngOnInit() {
    // use problem id as session id
    this.route.params
      .subscribe(params => {
        this.sessionId = params['id'];
        this.initEditor();
      });
    }

  initEditor(): void {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor(); 

    // setup collaboration socket
    this.collaborationService.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;
    
    // registrer change callback
    this.editor.on("change", (e) => {
      console.log('editor changes: ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        this.collaborationService.change(JSON.stringify(e));
      }
    })
 
  }

  // Reset editor 
  resetEditor(): void {
    this.editor.setValue(this.defaultContent[this.language]);
    this.editor.getSession().setMode("ace/mode/" + this.language.toLowerCase());
  }

  // Set language
  setLanguage(): void {
    this.resetEditor();
  }

  // Submit: execute once submit button is clicked 
  submit(): void {
    // get the current session's content
    let user_code = this.editor.getValue();
    console.log(user_code);
  }
}