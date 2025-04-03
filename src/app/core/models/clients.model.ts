export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  companyName: string;
  nif: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  clientType: 'publisher' | 'distributor' | 'general supplier';
  isActive: boolean;
}
