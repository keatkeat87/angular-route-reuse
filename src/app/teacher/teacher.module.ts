import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkingDaysComponent } from './working-days/working-days.component';
import { LessonsInDayComponent } from './lessons-in-day/lessons-in-day.component';
import { RouterModule } from '@angular/router';
import { TeacherLessonComponent } from './lesson/lesson.component';
import { StudentLessonComponent } from './lesson/student-lesson/student-lesson.component';
import { PapersComponent } from './lesson/student-lesson/papers/papers.component';
import { MoreComponent } from './lesson/student-lesson/more/more.component';
import { PaperDetailComponent } from './lesson/student-lesson/papers/paper-detail/paper-detail.component';
import { PaperTabComponent } from './lesson/student-lesson/paper-tab/paper-tab.component';

@NgModule({
  declarations: [WorkingDaysComponent, LessonsInDayComponent, TeacherLessonComponent, StudentLessonComponent, PapersComponent, MoreComponent, PaperDetailComponent, PaperTabComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class TeacherModule { }
