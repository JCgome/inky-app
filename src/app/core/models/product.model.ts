import { Author } from './author.model';
import { Category } from './category.model';
import { Publisher } from './publisher.model';
import { StockStatus } from './stock.model';

export interface Product {
  id: number;
  isbn: string;
  title: string;
  authors: Author[];
  category?: Category;
  publisher?: Publisher;
  providerName?: string;
  yearPublished?: number;
  pages?: number;
  format?: string;
  language?: string;
  price: number;
  imageUrl?: string;
  stockCurrent: number;
  stockStatus: StockStatus;
  active: boolean;
}
