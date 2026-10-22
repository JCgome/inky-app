import { Component } from '@angular/core';
import { LanguageService } from './core/services/language.service';
import { ROUTES } from './shared/constants/route-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'inky';
  ROUTES = ROUTES;

  // Instanciarlo aquí inicializa el idioma también fuera de /dashboard (p. ej. 404).
  constructor(private languageService: LanguageService) {}
}
