# Inky

Panel de gestión de librería (inventario, catálogo y movimientos de stock).
Angular 16 + Angular Material + PrimeNG + ng2-charts, con i18n (es/en) vía ngx-translate.

## Secciones

Dashboard, Productos (alta manual o por ISBN), Categorías, Autores, Almacén (stock) e Historial de movimientos.

## Requisitos

- Node 18+ y npm
- Backend REST de Inky (por defecto en `http://localhost:8080`)

## Desarrollo

```bash
npm install
npm start        # http://localhost:4200
```

`proxy.conf.json` redirige `/api` a `http://localhost:8080`, y `environment.ts` usa `API_URL: '/api'`.

## Build de producción

```bash
npm run build    # salida en dist/inky
```

Antes de desplegar, define la URL real del backend en `src/environments/environment.prod.ts` (`API_URL`)
y en la directiva `connect-src` de la CSP de `vercel.json`.

## Despliegue (Vercel)

`vercel.json` ya configura el build, el fallback SPA a `index.html`, la caché de assets y las cabeceras
de seguridad (CSP, HSTS, etc.). El backend debe permitir CORS desde el dominio del frontend.

## CI

`.github/workflows/ci.yml` compila en producción en cada push y PR a `develop` y `main`.
El job de tests es informativo (no bloquea) hasta que los specs estén al día.
Vercel despliega desde Git por su cuenta; el CI solo valida.

## Tests

```bash
npm test         # Karma + Jasmine
```
