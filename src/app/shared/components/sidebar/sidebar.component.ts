import {
  Component,
  computed,
  effect,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ROUTES } from '@app/shared/constants/route-constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  labels = {
    title: 'sidebar.title',
  };

  @Output() closeMenu = new EventEmitter<void>();

  isTabletOrMobile = signal(window.innerWidth <= 1024);

  sideNavCollapsed = signal(this.isTabletOrMobile());

  @Input()
  set collapsed(val: boolean) {
    if (!this.isTabletOrMobile()) {
      this.sideNavCollapsed.set(val);
    }
  }
  get collapsed(): boolean {
    return this.sideNavCollapsed();
  }

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));

  menuItems: { title: string; icon: string; route: string }[] = [];

  constructor(
    private router: Router,
    private translate: TranslateService,
  ) {
    this.loadMenuItems();
    this.translate.onLangChange.subscribe(() => {
      this.loadMenuItems();
    });

    window.addEventListener('resize', () => {
      this.isTabletOrMobile.set(window.innerWidth <= 1024);
      if (this.isTabletOrMobile()) {
        this.sideNavCollapsed.set(true);
      }
    });
  }

  private loadMenuItems(): void {
    const pagesRoute = this.router.config.find(
      (route) => route.path === ROUTES.dashboard,
    );

    if (pagesRoute && pagesRoute.children) {
      const routeData = pagesRoute.children.filter(
        (route) => route.data?.['title'] && route.data?.['icon'],
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
