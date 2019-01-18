import { Component, OnInit } from '@angular/core';
import { ReuseComponent } from '../Reuse.component';
import { ActivatedRoute, Router, NavigationEnd, UrlSegment, ActivatedRouteSnapshot } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-student-lesson',
  templateUrl: './student-lesson.component.html',
  styleUrls: ['./student-lesson.component.scss']
})
export class StudentLessonComponent extends ReuseComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super();
    this.componentName = 'student lessons' + this.activatedRoute.snapshot.paramMap.get('studentLessonsId');
    this.tabLinks = [
      { paths: ['papers'], fragment: undefined, queryParams: undefined, displayText: 'paper' },
      { paths: ['more'], fragment: undefined, queryParams: undefined, displayText: 'more' }
    ];
  }

  tabLinks: {
    paths: string[],
    queryParams: { [propName: string]: string } | undefined,
    fragment: string | undefined,
    displayText: string
  }[];

  isDetach = false;
  onDetach() {
    this.isDetach = true;
    console.log(this.componentName + ' detach');
  }
  onAttach() {
    this.isDetach = false;
    console.log(this.componentName + ' attach');
  }

  ngOnInit() {
    console.log('StudentLessonComponent Init');
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
      if(!this.isDetach) {


        const snapshot = this.activatedRoute.snapshot;
        const descendantSnapshot: ActivatedRouteSnapshot[] = [];
        let loopSnapshot = snapshot;
        while (loopSnapshot.firstChild !== null) {
          loopSnapshot = loopSnapshot.firstChild;
          descendantSnapshot.push(loopSnapshot);
        }
        const rootTab = descendantSnapshot[0].url.join('/');
        const tabLink = this.tabLinks.find(t => t.paths[0] === rootTab);
        tabLink.paths.length = 0;
        tabLink.paths.push(
          ...descendantSnapshot.map(s => s.url.join('/')).filter(v => v !== '')
        )
        tabLink.fragment = this.activatedRoute.snapshot.fragment;
        tabLink.queryParams = this.activatedRoute.snapshot.queryParams; // todo 当心不能换指针, 之后 test



        // const routerUrl = e.urlAfterRedirects;
        // const segments: UrlSegment[] = this.activatedRoute.snapshot.url;
        // let loopActivatedRoute = this.activatedRoute;
        // while (loopActivatedRoute.parent !== null) {
        //   loopActivatedRoute = loopActivatedRoute.parent;
        //   segments.unshift(...loopActivatedRoute.snapshot.url);
        // }
        // const activateRouteUrl = '/' + segments.map(s => s.toString()).join('/') + '/';
        // const leftSegments = routerUrl.replace(activateRouteUrl, '').split('/');
        // const rootTab = leftSegments[0];
        // const finalLeftPath = leftSegments.slice(1).join('/');
        // if(finalLeftPath !== '') {
        //   const tabLink = this.tabLinks.find(t => t.paths[0] === rootTab);
        //   tabLink.paths[1] = finalLeftPath;
        // }
      }
    });
  }

}
