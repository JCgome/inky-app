import { Injectable } from '@angular/core';
import { Client } from '../models/clients.model';
import { CLIENTS_MOCK } from '../models/mock-clients.data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockClientsService {
  private clients: Client[] = [...CLIENTS_MOCK];

  getClients(): Observable<Client[]> {
    return of(this.clients);
  }

  getClientById(id: number): Observable<Client | undefined> {
    return of(this.clients.find((p) => p.id === id));
  }

  createClient(data: Omit<Client, 'id'>): Observable<Client> {
    const newId = this.clients.length
      ? Math.max(...this.clients.map((p) => p.id)) + 1
      : 1;
    const newClient: Client = { id: newId, ...data };
    this.clients.push(newClient);
    return of(newClient);
  }

  updateClient(id: number, data: Partial<Client>): Observable<Client | null> {
    const index = this.clients.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.clients[index] = { ...this.clients[index], ...data };
      return of(this.clients[index]);
    }
    return of(null);
  }

  deleteClient(id: number): Observable<boolean> {
    this.clients = this.clients.filter((p) => p.id !== id);
    return of(true);
  }
}
