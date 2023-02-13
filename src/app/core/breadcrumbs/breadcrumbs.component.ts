import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authenticationService';
import { BreadcrumbsService } from '../services/breadcrumbsService';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
  providers: [AuthenticationService]
})
export class BreadcrumbsComponent {
  public constructor(private readonly breadcrumbService: BreadcrumbsService) {
  }

  public getBreadcrumb() {
    return this.breadcrumbService.getBreadcrumb();
  }
}
