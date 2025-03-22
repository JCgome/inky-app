export interface Producto {
  id: number;
  title: string;
  author: string;
  isbn: string;
  gender: string;
  year_publish: number;
  price: number;
  stock: string;
  number_pag: number;
  format: string;
  language: string;
  publisher: string;
  provider: string;
  image?: string;
}
