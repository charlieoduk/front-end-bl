import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { Bucketlist } from './bucketlist';

const BUCKETLIST: Bucketlist[] = [];

@Injectable()
export class BucketlistsService {
  private baseUrl: string = 'https://bucketlist-api-app.herokuapp.com/api/v1.0';

  constructor(private http: Http) { }
  // Get all bucketlists
  getAll(): Observable<Bucketlist[]> {
    let bucketlists = this.http
      .get(`${this.baseUrl}/bucketlists/`, { headers: this.getHeaders() })
      .map(mapBucketlists).catch(handleError);
      return bucketlists;
  }
  private getHeaders(): Headers {
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new Headers({
      'Authorization': currentUser.token,
      'Accept': 'application/json'
     });
    // headers.append('Accept', 'application/json');
    return headers;
  }
  // Get bucketlist by ID
  get(id: number): Observable<Bucketlist> {
    let bucketlist$ = this.http
      .get(`${this.baseUrl}/bucketlists/${id}/`, { headers: this.getHeaders() })
      .map(mapBucketlist);
      return bucketlist$;
  }
  // Add a new bucketlist

  addBucketlist(body: object): Observable<Bucketlist[]> {
    // let bodyString = JSON.stringify(body);
    return this.http.post(`${this.baseUrl}/bucketlists/`, {
      headers: this.getHeaders(),
      body: body
     }) // ...using post request
    .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
  // Add a new bucketlist item
  addBucketlistItem(body: string, id: number): Observable<Bucketlist[]> {
    const options = new RequestOptions({ headers: this.getHeaders() });
    return this.http.post(`${this.baseUrl}/bucketlists/${id}/items/`, body, options)
    .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  // Update a bucketlist

  updateBucketlist(body: object, id: number): Observable<Bucketlist[]> {
    return this.http.put(`${this.baseUrl}/bucketlists/${id}/`, {
      headers: this.getHeaders(),
      body: body
     })
    .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Delete a bucketlist
  deleteBucketlist(id: number): Observable<Bucketlist[]> {
    const options = new RequestOptions({ headers: this.getHeaders() });
    return this.http.delete(`${this.baseUrl}/bucketlists/${id}/`, {
      headers: this.getHeaders()
    })
    .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  // Delete a bucketlist item
  deleteBucketlistItem(id: number, itemid: number): Observable<Bucketlist[]> {
    return this.http.delete(`${this.baseUrl}/bucketlists/${id}/items/${itemid}/`, {
      headers: this.getHeaders()
    })
    .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  // Save bucketlist
  save(bucketlist: Bucketlist): Observable<Response> {
    // this won't actually work because the StarWars API
    // is read-only. But it would look like this:
    return this
      .http
      .put(`${this.baseUrl}/bucketlists/${bucketlist.id}`,
      JSON.stringify(bucketlist),
      { headers: this.getHeaders() });
  }
}

function mapBucketlists(response: Response): Bucketlist[] {
  // The response of the API has a results
  // property with the actual results
  return response.json().map(toBucketlist);
}

function toBucketlist(r: any): Bucketlist {
  const data = r.items;
  const count = data.filter(function(x){ return x.done; }).length;
  const bucketlist = <Bucketlist>({
    id: r.id,
    items: r.items,
    count : count,
    name: r.name,
    date_created: r.date_created,
    date_modified: r.date_modified,
  });
  console.log('Parsed bucketlist:', bucketlist);
  return bucketlist;
}

function mapBucketlist(response: Response): Bucketlist {
  // toPerson looks just like in the previous example
  return toBucketlist(response.json());
}

function handleError (error: any) {
  // log error
  // could be something more sofisticated
  const errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`;
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}


