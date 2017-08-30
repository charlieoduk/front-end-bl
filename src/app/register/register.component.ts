import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../alert.service';
import { UserService } from '../user.service';

@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html'
})

export class RegisterComponent {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  register() {

    console.log(this.model);
    this.loading = true;
    const body = JSON.stringify(this.model);
    this.userService.create(body)
      .subscribe(
      data => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }
}
