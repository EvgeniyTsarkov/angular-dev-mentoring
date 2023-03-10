import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoreModule } from '../core/core.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes)
  ]
})
export class NotFoundModule { }
