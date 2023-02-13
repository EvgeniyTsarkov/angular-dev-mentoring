import { Component } from '@angular/core';
import { LoadingService } from './core/services/loadingService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'angular-mentoring';
  public loading$ = this.loadingService.loading$;

  public constructor(private readonly loadingService: LoadingService){
  }
}
