import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';
import { Product, StockStatus } from '@app/core/models';
import { ProductService } from '@app/core/services/product.service';
import { StockService } from '@app/core/services/stock.service';
import { WeeklyStockSummary } from '@app/core/models';
import { ROUTES } from '@app/shared/constants/route-constants';

interface CategoryStock {
  name: string;
  stock: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  readonly labels = {
    title: 'dashboard.title',
    kpi_titles: 'dashboard.kpi.titles',
    kpi_units: 'dashboard.kpi.units',
    kpi_low: 'dashboard.kpi.low',
    kpi_value: 'dashboard.kpi.value',
    kpi_value_hint: 'dashboard.kpi.value_hint',
    kpi_out: 'dashboard.kpi.out',
    kpi_in_categories: 'dashboard.kpi.in_categories',
    by_category: 'dashboard.by_category',
    movements: 'dashboard.movements.title',
    entries: 'dashboard.movements.entries',
    exits: 'dashboard.movements.exits',
    restock: 'dashboard.restock.title',
    restock_all: 'dashboard.restock.view_all',
    restock_empty: 'dashboard.restock.empty',
    col_title: 'dashboard.restock.title_col',
    col_isbn: 'dashboard.restock.isbn',
    col_stock: 'dashboard.restock.stock',
    col_status: 'dashboard.restock.status',
    empty: 'dashboard.empty',
  };

  readonly statusLabels: Partial<Record<StockStatus, string>> = {
    LOW_STOCK: 'product.filters.low',
    OUT_OF_STOCK: 'product.filters.out',
  };

  readonly restockColumns = ['title', 'isbn', 'stock', 'status'];
  private readonly restockLimit = 5;
  private readonly categoryLimit = 6;

  today = new Date();
  loading = true;

  totalTitles = 0;
  totalUnits = 0;
  lowCount = 0;
  outCount = 0;
  inventoryValue = 0;
  categoriesCount = 0;

  stockByCategory: CategoryStock[] = [];

  private readonly chartColor = '#588157';

  movementsChart: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };
  hasMovements = false;

  readonly movementsChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: { legend: { position: 'top', align: 'end' } },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        grid: { color: '#eae7dd' },
        ticks: { precision: 0 },
      },
    },
  };

  categoryChart: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };

  readonly categoryChartOptions: ChartConfiguration<'bar'>['options'] = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: '#eae7dd' },
        ticks: { precision: 0 },
      },
      y: { grid: { display: false } },
    },
  };

  restock: Product[] = [];
  restockTotal = 0;

  constructor(
    private productService: ProductService,
    private stockService: StockService,
    private router: Router,
    private translate: TranslateService,
  ) {}

  get dateLabel(): string {
    return this.today.toLocaleDateString(this.translate.currentLang || 'es', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  ngOnInit(): void {
    this.stockService.getWeeklySummary(8).subscribe({
      next: (weeks) => this.buildMovementsChart(weeks),
      error: () => (this.hasMovements = false),
    });
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.compute(products);
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  private buildMovementsChart(weeks: WeeklyStockSummary[]): void {
    const lang = this.translate.currentLang || 'es';
    this.hasMovements = weeks.some((w) => w.entries > 0 || w.exits > 0);
    this.movementsChart = {
      labels: weeks.map((w) =>
        new Date(w.weekStart + 'T00:00:00').toLocaleDateString(lang, {
          day: 'numeric',
          month: 'short',
        }),
      ),
      datasets: [
        {
          label: this.translate.instant(this.labels.entries),
          data: weeks.map((w) => w.entries),
          borderColor: this.chartColor,
          backgroundColor: 'rgba(88, 129, 87, 0.12)',
          fill: true,
          tension: 0.3,
        },
        {
          label: this.translate.instant(this.labels.exits),
          data: weeks.map((w) => w.exits),
          borderColor: '#e64800',
          backgroundColor: 'transparent',
          borderDash: [6, 4],
          tension: 0.3,
        },
      ],
    };
  }

  private compute(products: Product[]): void {
    this.totalTitles = products.length;
    this.totalUnits = products.reduce((sum, p) => sum + p.stockCurrent, 0);
    this.lowCount = products.filter(
      (p) => p.stockStatus === 'LOW_STOCK',
    ).length;
    this.outCount = products.filter(
      (p) => p.stockStatus === 'OUT_OF_STOCK',
    ).length;
    this.inventoryValue = products.reduce(
      (sum, p) => sum + p.price * p.stockCurrent,
      0,
    );

    const byCategory = new Map<string, number>();
    for (const p of products) {
      const name = p.category?.name ?? '—';
      byCategory.set(name, (byCategory.get(name) ?? 0) + p.stockCurrent);
    }
    this.categoriesCount = byCategory.size;
    this.stockByCategory = [...byCategory.entries()]
      .map(([name, stock]) => ({ name, stock }))
      .sort((a, b) => b.stock - a.stock)
      .slice(0, this.categoryLimit);
    this.categoryChart = {
      labels: this.stockByCategory.map((c) => c.name),
      datasets: [
        {
          data: this.stockByCategory.map((c) => c.stock),
          backgroundColor: this.chartColor,
          borderRadius: 4,
          maxBarThickness: 28,
        },
      ],
    };

    const needsRestock = products
      .filter((p) => p.stockStatus !== 'AVAILABLE')
      .sort((a, b) => a.stockCurrent - b.stockCurrent);
    this.restockTotal = needsRestock.length;
    this.restock = needsRestock.slice(0, this.restockLimit);
  }

  statusLabel(p: Product): string {
    return this.statusLabels[p.stockStatus] ?? '';
  }

  goStore(): void {
    this.router.navigate([ROUTES.dashboard, ROUTES.store]);
  }
}
