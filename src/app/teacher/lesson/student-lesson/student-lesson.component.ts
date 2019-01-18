import { Component, OnInit } from '@angular/core';
import { ReuseComponent } from '../Reuse.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-lesson',
  templateUrl: './student-lesson.component.html',
  styleUrls: ['./student-lesson.component.scss']
})
export class StudentLessonComponent extends ReuseComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute
  ) { 
    super();
    this.componentName = 'student lessons' + this.activatedRoute.snapshot.paramMap.get('studentLessonsId');
  }
  
  ngOnInit() {
     console.log('StudentLessonComponent Init'); 
  }

}
