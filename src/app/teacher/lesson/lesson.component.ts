import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class TeacherLessonComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  firstLoading = true;
  studentLessonWithLinks: { studentLesson: { Id: number }, link: string[] }[];
  ngOnInit() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      const Id = +this.activatedRoute.firstChild.snapshot.paramMap.get('studentLessonsId');
      const tab = this.activatedRoute.firstChild.firstChild.routeConfig.path;
      const link = this.studentLessonWithLinks.find(s => s.studentLesson.Id === Id).link;
      link[1] = tab;
    });

    setTimeout(() => {
      this.firstLoading = false;
      this.studentLessonWithLinks = [
        { studentLesson: { Id: 1 }, link: ['1', 'papers'] },
        { studentLesson: { Id: 2 }, link: ['2', 'papers'] },
        { studentLesson: { Id: 3 }, link: ['3', 'papers'] },
        { studentLesson: { Id: 4 }, link: ['4', 'papers'] },
      ];
      this.router.navigate(this.studentLessonWithLinks[0].link, {
        relativeTo: this.activatedRoute,
        replaceUrl: true
      })
    }, 2000);
  }
}
