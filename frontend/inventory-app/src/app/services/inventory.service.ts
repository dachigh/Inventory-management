import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory.models';

const baseUrl = 'http://localhost:8080/inventories';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  
  getAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, { params });
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}