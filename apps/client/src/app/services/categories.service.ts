import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private serverUrl: string = "";
  private categoriesSubject = new BehaviorSubject<ICategory[]>([]);

  constructor(private http: HttpClient) {
    this.serverUrl = environment?.server_url;
  }

  get categories$(): Observable<ICategory[]> {
    return this.categoriesSubject.asObservable();
  }
  async loadCategories() {
    const categoriesUrl = `${this.serverUrl}/products/categories`;
    const result = await firstValueFrom(this.http.get(categoriesUrl))
      .then((res: any) => {
        if (res?.categories) {
          this.categoriesSubject.next(res?.categories);
          return res?.categories;
        }
        else this.categoriesSubject.next([]);
      })
    return result
  }
  
}
