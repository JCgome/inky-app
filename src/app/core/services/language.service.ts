import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  private initLanguage() {
    const savedLang =
      localStorage.getItem('lang') || this.translate.getBrowserLang();
    this.translate.use(savedLang?.match(/en|es/) ? savedLang : 'en');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  getLanguage(): string {
    return this.translate.currentLang;
  }
}
