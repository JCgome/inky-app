import { environment } from '@environments/environment';

const API_BASE = environment.API_URL;

export const PRODUCT_ENDPOINTS = {
  getAll: () => `${API_BASE}/books`,
  getById: (id: number) => `${API_BASE}/books/${id}`,
  create: () => `${API_BASE}/books`,
  update: (id: number) => `${API_BASE}/books/${id}`,
  delete: (id: number) => `${API_BASE}/books/${id}`,
  activate: (id: number) => `${API_BASE}/books/${id}/activate`,
  lookup: () => `${API_BASE}/books/lookup`,
  createFromIsbn: () => `${API_BASE}/books/from-isbn`,
  importByTitle: () => `${API_BASE}/books/import-by-title`,
} as const;

export const AUTHOR_ENDPOINTS = {
  getAll: () => `${API_BASE}/authors`,
  getById: (id: number) => `${API_BASE}/authors/${id}`,
  create: () => `${API_BASE}/authors`,
  update: (id: number) => `${API_BASE}/authors/${id}`,
  delete: (id: number) => `${API_BASE}/authors/${id}`,
} as const;

export const CATEGORY_ENDPOINTS = {
  getAll: () => `${API_BASE}/categories`,
  getById: (id: number) => `${API_BASE}/categories/${id}`,
  getBooks: (id: number) => `${API_BASE}/categories/${id}/books`,
  create: () => `${API_BASE}/categories`,
  update: (id: number) => `${API_BASE}/categories/${id}`,
  delete: (id: number) => `${API_BASE}/categories/${id}`,
} as const;

export const PUBLISHER_ENDPOINTS = {
  getAll: () => `${API_BASE}/publishers`,
  getById: (id: number) => `${API_BASE}/publishers/${id}`,
  create: () => `${API_BASE}/publishers`,
  update: (id: number) => `${API_BASE}/publishers/${id}`,
  delete: (id: number) => `${API_BASE}/publishers/${id}`,
} as const;

export const STOCK_ENDPOINTS = {
  register: () => `${API_BASE}/stock-movements`,
  getAll: () => `${API_BASE}/stock-movements`,
  weeklySummary: () => `${API_BASE}/stock-movements/weekly-summary`,
} as const;
