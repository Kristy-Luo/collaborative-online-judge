import { DataService } from './../../services/data.service';
import { Problem } from './../../models/problem.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {
  problem: Problem; 

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

}
