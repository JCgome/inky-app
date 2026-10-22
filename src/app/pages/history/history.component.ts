import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MovementType, StockMovement } from '@app/core/models';
import { StockService } from '@app/core/services/stock.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  loading = true;
  showFilters = false;
  displayedColumns: string[] = [
    'date',
    'book',
    'type',
    'quantity',
    'stockAfter',
    'note',
  ];
  dataSource = new MatTableDataSource<StockMovement>([]);

  types: { value: MovementType; label: string }[] = [
    { value: 'IN', label: 'history.in' },
    { value: 'OUT', label: 'history.out' },
  ];

  filterForm = this.fb.group({
    search: [''],
    type: [null as MovementType | null],
    from: [null as Date | null],
    to: [null as Date | null],
  });

  // La tabla se renderiza tras cargar; el paginador se engancha al aparecer.
  @ViewChild(MatPaginator) set paginator(p: MatPaginator) {
    if (p) this.dataSource.paginator = p;
  }

  constructor(
    private stockService: StockService,
    private fb: FormBuilder,
  ) {
    this.dataSource.filterPredicate = (m) => this.matchesFilters(m);
  }

  get activeFilters(): number {
    const { search, type, from, to } = this.filterForm.value;
    return [search?.trim(), type, from, to].filter(Boolean).length;
  }

  ngOnInit(): void {
    this.stockService.getMovements().subscribe({
      next: (movements) => {
        // Más recientes primero.
        this.dataSource.data = [...movements].sort(
          (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
        );
        this.loading = false;
      },
      error: () => (this.loading = false),
    });

    // Filtros en cliente; el predicate lee los valores del form.
    this.filterForm.valueChanges
      .pipe(debounceTime(250))
      .subscribe(() => this.applyFilters());
  }

  private applyFilters(): void {
    this.dataSource.filter = String(Date.now());
    this.dataSource.paginator?.firstPage();
  }

  private matchesFilters(m: StockMovement): boolean {
    const { search, type, from, to } = this.filterForm.value;
    if (type && m.type !== type) return false;

    const created = new Date(m.createdAt);
    if (from) {
      const start = new Date(from);
      start.setHours(0, 0, 0, 0);
      if (created < start) return false;
    }
    if (to) {
      const end = new Date(to);
      end.setHours(23, 59, 59, 999);
      if (created > end) return false;
    }

    const q = search?.trim().toLowerCase();
    if (!q) return true;
    return (
      m.bookTitle.toLowerCase().includes(q) ||
      (m.note?.toLowerCase().includes(q) ?? false)
    );
  }

  clearFilters(): void {
    this.filterForm.reset({ search: '', type: null, from: null, to: null });
  }
}
