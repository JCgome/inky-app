import { Component } from '@angular/core';
import { ROUTES } from './shared/constants/route-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'inky';
  ROUTES = ROUTES;
}
