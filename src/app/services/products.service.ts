import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  pageSize: number = 5;
  constructor(private http: HttpClient) { }

  addProduct(payload: FormData) : Observable<any>{
    return this.http.post<any>(environment.baseUrl + 'Products', payload);
  }
  deleteProduct(productId: number): Observable<any>{
    return this.http.delete(environment.baseUrl + 'products/' + productId);
  }
  updateProduct(payload: FormData, id: number): Observable<any>{
    return this.http.put<any>(environment.baseUrl + 'Products/' + id, payload);
  }
  getAllProducts(pageNumber: number): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'Products?pageNumber=' + pageNumber + '&pageSize=' + this.pageSize);
  }
  getProductById(productId: number) : Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'Products/' + productId);
  }
  deleteProductImg(imgId: number) {
    return this.http.delete<any>(environment.baseUrl + 'Products/images/' + imgId);
  }
}
