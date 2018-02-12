import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router'; 
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { EditorComponent } from './components/editor/editor.component'; 
import { DataService } from './services/data.service';
import { CollaborationService } from './services/collaboration.service'; 

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    NavbarComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    DataService, 
    CollaborationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
