import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { RouterModule, Routes} from '@angular/router'; 

export const appRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'problems'},
    {path: 'problems/:id', component: ProblemDetailComponent},
    {path: 'problems', component: ProblemListComponent},
    {path: '**', redirectTo: 'problems'}
]
