export interface Promotion {
  name: string;
  discountType: string;
  startDate: string;
  endDate: string;
  subscriptionCount: number;
  averagePercentage: number;
  grossIncome: number;
  status: 'Activa' | 'Proximas' | 'Expiradas';
}
