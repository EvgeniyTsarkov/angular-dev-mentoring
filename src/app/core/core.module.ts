import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { IsAuthenticatedDirective } from './directives/is-authenticated.directive';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { ValidateDateDirective } from './validators/date-field.directive';
import { LengthFieldDirective } from './validators/length-field.directive';
import { ValidateAuthorsDirective } from './validators/authors-form.validators';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LogoComponent,
    BreadcrumbsComponent,
    IsAuthenticatedDirective,
    SpinnerComponent,
    ValidateDateDirective,
    LengthFieldDirective,
    ValidateAuthorsDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    SpinnerComponent,
    ValidateDateDirective,
    LengthFieldDirective,
    ValidateAuthorsDirective
  ]
})
export class CoreModule { }
