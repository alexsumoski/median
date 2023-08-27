import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DBService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createPost(postData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/posts`, postData);
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/posts`);
  }

  updatePost(postId: string, postData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/posts/${postId}`, postData);
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/posts/${postId}`);
  }
}
