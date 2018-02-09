import { NavbarComponent } from './../navbar/navbar.component';
import { DataService } from './../../services/data.service';
import { Problem } from './../../models/problem.model';
import { Component, OnInit } from '@angular/core';

const DEFAULT_PROBLEM: Problem = Object.freeze({
  id: 0,
  name: '',
  description: '',
  difficulty: 'easy'
})

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css']
})
export class NewProblemComponent implements OnInit {
  difficulties: string[] = ['easy', 'medium', 'hard', 'super'];
  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM); 

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }
  
  // Execute once the submit button is clicked 
  addProblem() {
    this.dataService.addProblem(this.newProblem);
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  } 
}
