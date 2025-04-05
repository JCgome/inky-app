import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  menuItems: { title: string; icon: string; route: string }[] = [];

  constructor(private router: Router, private translate: TranslateService) {
    this.loadMenuItems();
    this.translate.onLangChange.subscribe(() => {
      this.loadMenuItems();
    });
  }

  private loadMenuItems(): void {
    const pagesRoute = this.router.config.find(
      (route) => route.component?.name === 'PagesComponent'
    );

    if (pagesRoute?.children) {
      const routeData = pagesRoute.children.filter(
        (route) => route.data?.['title'] && route.data?.['icon']
      );
      this.translate
        .get(routeData.map((route) => route.data!['title']))
        .subscribe((translations) => {
          this.menuItems = routeData.map((route) => ({
            title: translations[route.data!['title']],
            icon: route.data!['icon'],
            route: `/${pagesRoute.path}/${route.path}`,
          }));
        });
    }
  }
}
