import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lessons-in-day',
  templateUrl: './lessons-in-day.component.html',
  styleUrls: ['./lessons-in-day.component.scss']
})
export class LessonsInDayComponent implements OnInit {

  constructor(
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('lessons in day id = ', this.activatedRoute.snapshot.paramMap.get('Id'));
  }

}
