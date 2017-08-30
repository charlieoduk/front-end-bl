import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AlertService } from './alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthenticationService {
    private baseUrl: string = 'https://bucketlist-api-app.herokuapp.com';
    errorMessage: string = '';

    constructor(private http: Http,
         private alertService: AlertService,
         private router: Router
        ) { }

    login(email: string, password: string) {
        return this.http.post(`${this.baseUrl}/api/v1.0/auth/login/`, JSON.stringify({ email: email, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }else {
                    alert(user.message);
                    window.location.reload();
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

}
