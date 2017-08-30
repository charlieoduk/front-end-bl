import { Component, OnInit, Input } from '@angular/core';
import { Bucketlist } from '../bucketlist';
import { BucketlistsService } from '../bucketlists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from '../confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css']
})
export class BucketListComponent implements OnInit {
  @Input()bucketlists: Bucketlist[];
  errorMessage: string = '';
  isLoading: boolean = true;
  model: any = {};

  constructor(private bucketlistsService: BucketlistsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.bucketlistsService.getAll().subscribe((data) => {
      this.bucketlists = data;
    });
  }
  addBucketlist() {
    const body = JSON.stringify(this.model);
    this.bucketlistsService
    .addBucketlist(body)
    .subscribe(response => this.bucketlistsService.getAll().subscribe((data) => {
      this.bucketlists = data;
    }));
  }
  delete(id: string) {
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      title: 'Delete Bucketlist',
      message: 'Are you sure you want to delete this bucketlist'})
      .subscribe((isConfirmed) => {
          if (isConfirmed) {
              // alert('accepted');
              console.log('deleting bucketlist with id: ', id);
              this.bucketlistsService
              .deleteBucketlist(Number(id))
              .subscribe(p => {
                this.bucketlistsService.getAll().subscribe((data) => {
                  this.bucketlists = data;
                });
              });
          }
      });
    setTimeout(() => {
      disposable.unsubscribe();
      }, 10000);
    }
  }
