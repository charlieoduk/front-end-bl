import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from './user';

@Injectable()
export class UserService {
  private baseUrl: string = 'https://bucketlist-api-app.herokuapp.com/api/v1.0';

  constructor(private http: Http) { }

  create(body: string) {
    return this.http.post(`${this.baseUrl}/auth/register/`, body)
    .map((response: Response) => response.json());
  }
}
