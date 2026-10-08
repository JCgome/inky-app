export interface ProductRequest {
  isbn: string;
  title: string;
  authorIds: number[];
  categoryId?: number;
  publisherId?: number;
  providerName?: string;
  yearPublished?: number;
  pages?: number;
  format?: string;
  language?: string;
  price: number;
  imageUrl?: string;
}
