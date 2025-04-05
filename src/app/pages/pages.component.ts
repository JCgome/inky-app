import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  opened = false;
  collapsed = signal(false);
  sidenavWidth(): string {
    return '60px';
  }

  isTabletOrMobile(): boolean {
    return window.innerWidth <= 1024;
  }

  toggleSidebar() {
    if (!this.isTabletOrMobile()) {
      this.collapsed.set(!this.collapsed());
    }
  }
}
