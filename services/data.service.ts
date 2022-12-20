import { BadInput } from './../../common/bad-input';
import { NotFoundError } from './../../common/not-found-error';
import { AppError } from './../../common/app-error';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(@Inject(String) private url: string, private http: HttpClient) {}

  getAll<T>() {
    return this.http.get<T>(this.url).pipe(
      map((data) => data),
      catchError(this.handleError)
    );
  }

  create(resourse: any) {
    return throwError(() => new AppError());
    return this.http.post(this.url, JSON.stringify(resourse)).pipe(
      map((data) => data),
      catchError(this.handleError)
    );
  }

  update(resourse: any) {
    return this.http
      .patch(`${this.url}/${resourse.id}`, JSON.stringify({ isRead: true }))
      .pipe(
        map((data) => data),
        catchError(this.handleError)
      );
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      map((data) => data),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response) {
    if (error.status === 400)
      return throwError(() => new BadInput(error.json()));

    if (error.status === 404) return throwError(() => new NotFoundError());
    return throwError(() => new AppError(error.json()));
  }
}
