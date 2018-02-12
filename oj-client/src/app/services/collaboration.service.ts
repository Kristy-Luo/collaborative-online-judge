import { Injectable } from '@angular/core';

declare var io: any;

@Injectable()
export class CollaborationService {
  collaborationSocket: any;

  constructor() { }

  init(editor: any, sessionId: string): void {
    //this.socket = io(); // connect to the host that serves the page by default 
    this.collaborationSocket = io(window.location.origin, {query: 'sessionId=' + sessionId});

    this.collaborationSocket.on("change", (delta: string) => {
      console.log('collabration: editor changes by ' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    })
  }

  // emit event to make changes and inform server and other collaborators
  change(delta: string): void {
    this.collaborationSocket.emit("change", delta);
  }
}
