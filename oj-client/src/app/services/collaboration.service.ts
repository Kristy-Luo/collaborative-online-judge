import { Injectable } from '@angular/core';

// io is alread imported in .angular.cli.json
declare var io: any; 

@Injectable()
export class CollaborationService {
  socket: any; 

  constructor() { }

  init(problemID: string, editor: any) { 
    // Connect to the host (http://localhost:3000) and send the problemID 
    this.socket = io({query: {
      problemID: problemID
    }}); 
     
    // Listen for change events
    this.socket.on('change', delta => {
      delta = JSON.parse(delta); // string to JavaScript object 
      console.log("delta" + delta);
      // Avoid triggering another change event based on this change 
      editor.lastAppliedChange = delta; 
      editor.getSession().getDocument().applyDeltas([delta]); // apply change 
    });
  }
  
  // Emit a change event whenever the editor detects an input change
  change(delta: string): void {
    this.socket.emit('change', delta);
  }
}
