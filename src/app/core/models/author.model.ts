export interface Author {
  id: number;
  name: string;
  bookCount?: number;
}

export interface AuthorRequest {
  name: string;
}
