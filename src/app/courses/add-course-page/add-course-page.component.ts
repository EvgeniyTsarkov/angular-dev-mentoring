/* eslint-disable max-len */
/* eslint-disable quote-props */
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, take } from 'rxjs';
import { AddCourseModel } from 'src/app/core/models/AddSourseModel';
import { Breadcrumb } from 'src/app/core/models/Breadcrumb';
import { Course } from 'src/app/core/models/Course';
import { BreadcrumbsService } from 'src/app/core/services/breadcrumbsService';
import { CoursesFacade } from 'src/app/store/facades/courses.facade';
import { CoursesService } from '../courses-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Author } from 'src/app/core/models/Author';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.css'],
  providers: [DatePipe]
})
export class AddCoursePageComponent implements OnInit {
  @Input() public addCourseModel!: AddCourseModel;

  public savedCourse!: Course;

  public form!: FormGroup;

  public readonly maxTitleFieldErrorMessage = 'This field shall contain maximum 50 characters.';
  public readonly maxDescriptionFieldErrorMessage = 'This field shall contain maximum 500 characters.';
  public readonly wrongDateFormatErrorMessage = 'Date format shall be mm/dd/yyyy.';
  public readonly courseLengthErrorMessage = 'This field can contain integers only.';
  public readonly authorsErrorMessage = 'A course shall have at least one author.';

  private readonly defaultModel = {
    id: 0,
    name: '',
    description: '',
    date: '',
    length: 0,
    authors: []
  };

  private readonly maxTitleLength = 50;
  private readonly maxDescriptionLength = 500;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly coursesService: CoursesService,
    private readonly router: Router,
    private readonly breadcrumbService: BreadcrumbsService,
    private readonly datePipe: DatePipe,
    private readonly coursesFacade: CoursesFacade,
  ) {
  }

  public async ngOnInit(): Promise<any> {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId !== null) {
      const course$ = this.coursesService.getById<Course>(+courseId).pipe(take(1));
      this.savedCourse = await firstValueFrom(course$);
    }

    this.addCourseModel = this.savedCourse ? {
      id: this.savedCourse?.id,
      name: this.savedCourse?.name,
      description: this.savedCourse?.description,
      date: this.datePipe.transform(this.savedCourse.date, 'MM/dd/yyyy') as string,
      length: this.savedCourse?.length,
      authors: this.savedCourse.authors
    } : this.defaultModel;

    this.form = new FormGroup({
      id: new FormControl(this.addCourseModel.id),
      name: new FormControl(this.addCourseModel.name, [
        Validators.required,
        Validators.maxLength(this.maxTitleLength)]),
      description: new FormControl(this.addCourseModel.description,
        Validators.maxLength(this.maxDescriptionLength)),
      date: new FormControl(this.addCourseModel.date),
      length: new FormControl(this.addCourseModel.length),
      authors: new FormControl(this.addCourseModel.authors)
    });

    const breadcrumb: string = this.route.snapshot.data['breadcrumb'];

    const breadcrumbAssembly: Breadcrumb = {
      courseText: ` / ${this.addCourseModel.name}`,
      url: `/${breadcrumb.toLowerCase()}`,
      urlText: breadcrumb
    };

    this.breadcrumbService.setBreadcrumb(breadcrumbAssembly);
  }

  public onSubmit(submittedForm: AddCourseModel) {
    const newOrUpdatedCourse: Course = {
      ...submittedForm,
      date: new Date(submittedForm.date),
      length: submittedForm.length,
      authors: submittedForm.authors
    };

    if (this.addCourseModel.id !== 0) {
      this.coursesFacade.updateCourse(newOrUpdatedCourse);
    } else {
      this.coursesFacade.createCourse(newOrUpdatedCourse);
    }

    this.router.navigateByUrl('courses');
  }

  public onClickCancel() {
    this.router.navigateByUrl('courses');
  }

  public sendAuthorsFromInput(authors: Author[]) {
    this.addCourseModel.authors = authors;
  }
}
