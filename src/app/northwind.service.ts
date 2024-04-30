import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NorthwindService {
  // private baseUrl = 'http://64.227.125.239:5000/api';
  private baseUrl = 'http://localhost:5233/api';

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

  // registerUser(user: any): Observable<any> {
  //   return this.http.post<any>(
  //     `${this.baseUrl}/auth/register`,
  //     JSON.stringify(user),
  //   );
  // }

  registerUser(user: any): Observable<any> {
    console.log('user nedi123123r', user);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // İçerik tipini JSON olarak belirtme
    });

    return this.http.post<any>(
      `${this.baseUrl}/auth/register`,
      JSON.stringify(user),
      {
        headers: headers,
      },
    );
  }
}
