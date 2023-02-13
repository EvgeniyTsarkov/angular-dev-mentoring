import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { DateHighlightDirective } from './course-item/date-highlight.directive';
import { FormatDurationPipe } from './course-item/format-duration.pipe';
import { OrderByPipe } from './courses-list/order-by.pipe';
import { TitleFilterPipe } from './courses-list/title-filter.pipe';
import { ModalModule } from '../modal/modal.module';
import { CoursesService } from './courses-service';
import { AddCoursePageComponent } from './add-course-page/add-course-page.component';
import { CoreModule } from '../core/core.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { BreadcrumbsService } from '../core/services/breadcrumbsService';
import { PaginationComponent } from './pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorTagComponent } from './author-tag/author-tag.component';
import { AddAuthorsComponent } from './add-authors/add-authors.component';
import { ValidatorsFactory } from '../core/validators/validators-factory.validators';
import { AuthorsService } from '../core/services/authorsService';

const routes: Routes = [
  {
    path: 'courses',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {
      breadcrumb: 'Courses'
    },
    component: CoursesPageComponent
  },
  {
    path: 'courses',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {
      breadcrumb: 'Courses'
    },
    children: [
      {
        path: 'new', component: AddCoursePageComponent,
      },
      {
        path: ':id', component: AddCoursePageComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    CoursesPageComponent,
    CoursesListComponent,
    CourseItemComponent,
    DateHighlightDirective,
    FormatDurationPipe,
    OrderByPipe,
    TitleFilterPipe,
    AddCoursePageComponent,
    PaginationComponent,
    AuthorTagComponent,
    AddAuthorsComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    ModalModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CoursesPageComponent,
    AddCoursePageComponent,
  ],
  providers: [
    CoursesService,
    BreadcrumbsService,
    AuthorsService,
    ValidatorsFactory
  ]
})
export class CoursesModule { }
