import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  opened = true;
  collapsed = signal(false);

  sidenavWidth(): string {
    return this.isTabletOrMobile()
      ? '60px'
      : this.collapsed()
      ? '60px'
      : '250px';
  }

  contentMargin(): string {
    return this.isTabletOrMobile()
      ? '60px'
      : this.collapsed()
      ? '60px'
      : '250px';
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
