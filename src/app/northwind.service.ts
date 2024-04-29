import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NorthwindService {
  private baseUrl = 'https://northwind.vercel.app/api';

  constructor(private http: HttpClient) {}

  // Tüm kullanıcıları getir
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`);
  }

  // ID'ye göre tek bir kullanıcı getir
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${id}`);
  }

  // Yeni bir kullanıcı oluştur
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/products`, product);
  }

  // Mevcut bir kullanıcıyı güncelle
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/products/${id}`, product);
  }

  // Kullanıcıyı sil
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/products/${id}`);
  }
}
