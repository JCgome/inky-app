import {
  Component,
  computed,
  EventEmitter,
  Output,
  signal,
} from '@angular/core';
import { LanguageService } from '@app/core/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent {
  languages = [
    { code: 'es', flag: 'assets/img/flags/es.png' },
    { code: 'en', flag: 'assets/img/flags/gb.png' },
  ];

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}
  @Output() toggleSidebar = new EventEmitter<void>();

  toggleMenu() {
    this.toggleSidebar.emit();
  }

  cambiarIdioma(lang: string) {
    this.languageService.setLanguage(lang);
  }

  getIdiomaActual(): string {
    return this.languageService.getLanguage();
  }

  getFlagSelected(): string {
    const langSelected = this.getIdiomaActual();
    return (
      this.languages.find((lang) => lang.code === langSelected)?.flag ||
      'assets/flags/gb.svg'
    );
  }

  isTabletOrMobile(): boolean {
    return window.innerWidth <= 1024;
  }
}
