export type StockStatus = 'OUT_OF_STOCK' | 'LOW_STOCK' | 'AVAILABLE';

export type MovementType = 'IN' | 'OUT';

export interface StockMovementRequest {
  bookId: number;
  type: MovementType;
  quantity: number;
  note?: string;
}

export interface StockMovement {
  id: number;
  bookId: number;
  bookTitle: string;
  type: MovementType;
  quantity: number;
  stockAfter: number;
  note?: string;
  createdAt: string;
}
