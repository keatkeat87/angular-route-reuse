import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, UrlSegment, ActivatedRouteSnapshot } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class TeacherLessonComponent implements OnInit, OnDestroy {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  private onDestroy$ = new Subject();
  firstLoading = true;
  studentLessonWithLinks: {
    studentLesson: { Id: number },
    paths: string[],
    queryParams: { [propName: string]: string } | undefined,
    fragment: string | undefined
  }[];

  ngOnInit() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd), takeUntil(this.onDestroy$)).subscribe((e: NavigationEnd) => {
      const snapshot = this.activatedRoute.snapshot;
      const descendantSnapshot: ActivatedRouteSnapshot[] = [];
      let loopSnapshot = snapshot;
      while (loopSnapshot.firstChild !== null) {
        loopSnapshot = loopSnapshot.firstChild;
        descendantSnapshot.push(loopSnapshot);
      }
      const studentLessonId = +descendantSnapshot[0].url.join('/');
      const studentLessonWithLink = this.studentLessonWithLinks.find(s => s.studentLesson.Id === studentLessonId);
      studentLessonWithLink.paths.length = 0;
      studentLessonWithLink.paths.push(
        ...descendantSnapshot.map(s => s.url.join('/')).filter(v => v !== '')
      )
      studentLessonWithLink.fragment = this.activatedRoute.snapshot.fragment;
      studentLessonWithLink.queryParams = this.activatedRoute.snapshot.queryParams; // todo 当心不能换指针, 之后 test

       
      // let routerUrl = e.urlAfterRedirects;
      // const queryParamIndex = routerUrl.indexOf('?');
      // if (queryParamIndex !== -1) {
      //   routerUrl = routerUrl.substring(0, queryParamIndex);
      // }
      // const fragmentIndex = routerUrl.indexOf('#');
      // if (fragmentIndex !== -1) {
      //   routerUrl = routerUrl.substring(0, fragmentIndex);
      // }
      // const segments: UrlSegment[] = this.activatedRoute.snapshot.url;
      // let loopActivatedRoute = this.activatedRoute;
      // while (loopActivatedRoute.parent !== null) {
      //   loopActivatedRoute = loopActivatedRoute.parent;
      //   segments.unshift(...loopActivatedRoute.snapshot.url);
      // }
      // const activateRouteUrl = '/' + segments.map(s => s.toString()).join('/') + '/';
      // const leftSegments = routerUrl.replace(activateRouteUrl, '').split('/');
      // const studentLessonId = +leftSegments[0];
      // const finalLeftPath = leftSegments.slice(1).join('/');


      // const studentLessonWithLink = this.studentLessonWithLinks.find(s => s.studentLesson.Id === studentLessonId);
      // if (finalLeftPath === 'papers/5') {
      //   studentLessonWithLink.paths[1] = 'papers';
      //   studentLessonWithLink.paths[2] = '5';
      // }
      // else {
      //   studentLessonWithLink.paths[1] = finalLeftPath;
      //   console.log('finalLeftPath', finalLeftPath);
      // }
      // studentLessonWithLink.fragment = this.activatedRoute.snapshot.fragment;
      // studentLessonWithLink.queryParams = this.activatedRoute.snapshot.queryParams;
      // console.log('la', studentLessonWithLink.paths);
    });

    setTimeout(() => {
      this.firstLoading = false;
      this.studentLessonWithLinks = [
        { studentLesson: { Id: 1 }, paths: ['1', 'papers'], fragment: undefined, queryParams: undefined },
        { studentLesson: { Id: 2 }, paths: ['2', 'papers'], fragment: undefined, queryParams: undefined },
        { studentLesson: { Id: 3 }, paths: ['3', 'papers'], fragment: undefined, queryParams: undefined },
        { studentLesson: { Id: 4 }, paths: ['4', 'papers'], fragment: undefined, queryParams: undefined }
      ];
      this.router.navigate(this.studentLessonWithLinks[0].paths, {
        relativeTo: this.activatedRoute,
        replaceUrl: true
      })
    }, 2000);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
