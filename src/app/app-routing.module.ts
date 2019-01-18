import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { WorkingDaysComponent } from './teacher/working-days/working-days.component';
import { LessonsInDayComponent } from './teacher/lessons-in-day/lessons-in-day.component';
import { TeacherLessonComponent } from './teacher/lesson/lesson.component';
import { StudentLessonComponent } from './teacher/lesson/student-lesson/student-lesson.component';
import { PapersComponent } from './teacher/lesson/student-lesson/papers/papers.component';
import { MoreComponent } from './teacher/lesson/student-lesson/more/more.component';
import { PaperDetailComponent } from './teacher/lesson/student-lesson/papers/paper-detail/paper-detail.component';
import { PaperTabComponent } from './teacher/lesson/student-lesson/paper-tab/paper-tab.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'working-days' },
  { path: '', loadChildren: './home/home.module#HomeModule', data: { name: 'home module', } },
  { path: 'about', loadChildren: './about/about.module#AboutModule', data: { name: 'about module' } },
  { path: 'working-days', component: WorkingDaysComponent },
  { path: 'working-days/:Id/lessons-in-day', component: LessonsInDayComponent },
  {
    path: 'working-days/:workingDayId/lessons-in-day/:teacherLessonId/lesson',
    component: TeacherLessonComponent,
    children: [
      {
        path: ':studentLessonsId',
        component: StudentLessonComponent,
        data: { reuse: true, reuseParamKey: 'studentLessonsId' },
        children: [
          { 
            path : 'papers',
            component : PaperTabComponent,
            data: { reuse: true },
            children : [
              {
                path: '',
                component: PapersComponent,
                data: { reuse: true } 
              },
              {
                path: ':paperId',
                component: PaperDetailComponent,
                // data: { reuse: true, reuseParamKey: 'paperId' } 
              }
            ]
          },         
          {
            path: 'more',
            component: MoreComponent, 
            data: { reuse: true } 
          }
        ]
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
