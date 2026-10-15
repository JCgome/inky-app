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

/** Alta por ISBN: el backend completa el resto de datos desde Open Library. */
export interface BookFromIsbnRequest {
  isbn: string;
  categoryId?: number;
  price: number;
  format?: string;
  language?: string;
  providerName?: string;
}
