import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router'; 


import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { DataService } from './services/data.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component'; 

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    NavbarComponent,
    ProblemDetailComponent,
    NewProblemComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', pathMatch: 'full', redirectTo: 'problems'},
      {path: 'problems/:id', component: ProblemDetailComponent},
      {path: 'problems', component: ProblemListComponent},
      {path: '**', redirectTo: 'problems'}
    ])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
