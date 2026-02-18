import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// https://adham-essa.imgbb.com/

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'https://api.imgbb.com/1/upload';
  private apiKey = '5d2ab6c5b7193cb9c62989e39692d06c';
  constructor(private http: HttpClient) { }

  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(`${this.apiUrl}`,formData,{
      params: {'key': this.apiKey}
    });
  }
}
