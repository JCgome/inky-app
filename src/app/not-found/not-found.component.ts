import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '@app/shared/constants/route-constants';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate([ROUTES.DASHBOARD]);
  }
}
