import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { delay, filter, mergeMap, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _data: Product[] = [
    new Product({
      id: 1,
      name: '書籍 A',
      authors: ['作者甲', '作者乙', '作者丙'],
      company: '博碩文化',
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      createDate: new Date('2025/4/9'),
      price: 10000,
    }),
    new Product({
      id: 2,
      name: '書籍 B',
      authors: ['作者甲、作者乙、作者丙'],
      company: '博碩文化',
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      createDate: new Date('2025/4/9'),
      price: 10000,
    }),
    new Product({
      id: 3,
      name: '書籍 C',
      authors: ['作者甲、作者乙、作者丙'],
      company: '博碩文化',
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      createDate: new Date('2025/4/9'),
      price: 10000,
    }),
    new Product({
      id: 4,
      name: '書籍 D',
      authors: ['作者甲、作者乙、作者丙'],
      company: '博碩文化',
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      createDate: new Date('2025/4/9'),
      price: 10000,
    }),
    new Product({
      id: 5,
      name: '書籍 E',
      authors: ['作者甲、作者乙、作者丙'],
      company: '博碩文化',
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      createDate: new Date('2025/4/9'),
      price: 10000,
    }),
  ];

  getList(name: string | undefined, index: number, size: number): Observable<{ data: Product[]; count: number }> {
    const startIndex = (index - 1) * size;
    const endIndex = startIndex + size;
    const data = name ? this._data.filter((item) => item.name === name) : [...this._data];
    return of({ data: data.slice(startIndex, endIndex), count: this._data.length }).pipe(delay(1000));
  }
  getById(productId: number): Observable<Product> {
    return of(this._data).pipe(
      mergeMap((data) => data),
      filter(({ id }) => id === productId)
    );
  }
}
