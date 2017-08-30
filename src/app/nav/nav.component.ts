import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

// import { SearchService } from '../search.service';
import { Bucketlist } from '../bucketlist';
import { BucketlistsService } from '../bucketlists.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  results: Object;
  searchTerm$ = new Subject<string>();
  @Input() bucketlists: Bucketlist[];
  model: any = {};

  constructor(private authenticationService: AuthenticationService,
    private bucketlistsService: BucketlistsService,
  ) { }

  ngOnInit() {
  }
  logoutClicked($event) {
    this.authenticationService.logout();
  }
  performSearch(): void {
    const searchTerm = this.model.search;
    this.bucketlistsService.search(searchTerm)
      .subscribe((data) => {
        this.bucketlists = data;
      });
  }
}
