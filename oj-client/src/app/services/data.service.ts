import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
// import { catchError} from 'rxjs/operators';

import { Problem } from './../models/problem.model';
import { PROBLEMS } from './../mock-problems';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {
  problems: Problem[] = PROBLEMS; 

  constructor(private http: HttpClient) { }
   
  /*
   // return a full list of problems 
   getProblems (): Problem[] { // work with data stored locally 
    return this.problems; 
   }
   */
  // GET all problems from the server 
  getProblems(): Observable<Problem[]> {
    return this.http.get<Problem[]>('http://localhost:3000/api/v1/problems/');
    // TODO: Add error handling here
  }
   
   
   /*
   getProblemByID (id: number): Problem { // work with data stored locally 
     return this.problems.find( (problem) => problem.id === id);

   }
   */
   // GET problem by id. Will 404 if id not found
   getProblemByID (id: number): Observable<Problem> {
     const url = `http://localhost:3000/api/v1/problems/${id}`; 
     return this.http.get<Problem>(url); 
     // TODO: Add error handling here
   }
   
   
   /*
   addProblem (problem: Problem) {
     problem.id = this.problems.length + 1; 
     this.problems.push(problem);
   }
   */
  /*
  // POST: add a new problem to the server 
  addProblem (problem: Problem) {
    console.log("Submit!!!");
    const url = 'http://localhost:3000/api/v1/problems'; 
    this.http.post<Problem>(url, problem, httpOptions);
  }*/

  // Use Promise 
  addProblem(problem: Problem) {
    // problem.id = this.problems.length + 1;
    // this.problems.push(problem);
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    return this.http.post('http://localhost:3000/api/v1/problems', problem, options)
      .toPromise()
      .then((res: any) => {
        this.getProblems();
        return res;
      })
      .catch(this.handleError);    
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.body || error);
  }
}
