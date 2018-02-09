import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Problem } from './../models/problem.model';
import { PROBLEMS } from './../mock-problems';

const httpOptions = { 
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class DataService {
  private problemsUrl = 'http://localhost:3000/api/v1/problems';  // URL to web api

  constructor(private http: HttpClient) { }
  
  /*
  getProblems(): Observable<Problem[]> {
    return this.http.get<Problem[]>(this.problemsUrl);
    // TODO: Add error handling here
  }
  */
  
  // GET all problems from the server 
  private _problemSource = new BehaviorSubject<Problem[]>([]);

  getProblems(): Observable<Problem[]> {
    this.http.get(this.problemsUrl)
      .toPromise()
      .then((res: any) => {
        this._problemSource.next(res);
      })
      .catch(this.handleError);

      return this._problemSource.asObservable();
  }

  // GET problem by id
  getProblemByID (id: number): Observable<Problem> {
    const url = `${this.problemsUrl}/${id}`;
    return this.http.get<Problem>(url); 
    // TODO: Add error handling here. Return 404 if not found. 
  }

  /*
  addProblem (problem: Problem): Observable<Problem> {
    return this.http.post<Problem>(this.problemsUrl, problem, httpOptions);
  }
  */
  
  // POST: add a new problem to the server 
  addProblem(problem: Problem) {
    return this.http.post(this.problemsUrl, problem, httpOptions)
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
