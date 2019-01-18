import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { WorkingDaysComponent } from './teacher/working-days/working-days.component';
import { LessonsInDayComponent } from './teacher/lessons-in-day/lessons-in-day.component';
import { TeacherLessonComponent } from './teacher/lesson/lesson.component';
import { StudentLessonComponent } from './teacher/lesson/student-lesson/student-lesson.component';
import { PapersComponent } from './teacher/lesson/student-lesson/papers/papers.component';
import { MoreComponent } from './teacher/lesson/student-lesson/more/more.component';

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
        data: { reuse: true, paramMapKey: 'studentLessonsId' },
        children: [
          {
            path: 'papers',
            component: PapersComponent, 
            data: { reuse: true } 
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
