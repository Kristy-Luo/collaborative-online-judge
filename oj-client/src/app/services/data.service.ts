import { Injectable } from '@angular/core';
import { Problem } from './../models/problem.model';
import { PROBLEMS } from './../mock-problems';


@Injectable()
export class DataService {
  problems: Problem[] = PROBLEMS; 

  constructor() { }

   // return a full list of problems 
   getProblems (): Problem[] {
    return this.problems; 
   }
   
   // get problem by id 
   getProblemByID (id: number): Problem {
     return this.problems.find( (problem) => problem.id === id);

   }
   
   // add problem 
   addProblem (problem: Problem) {
     problem.id = this.problems.length + 1; 
     this.problems.push(problem);
   }
   
}
