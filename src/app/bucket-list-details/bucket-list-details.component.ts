import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ConfirmComponent } from '../confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Bucketlist } from '../bucketlist';
import { BucketlistsService } from '../bucketlists.service';

@Component({
  selector: 'app-bucket-list-details',
  templateUrl: './bucket-list-details.component.html',
  styleUrls: ['./bucket-list-details.component.css']
})
export class BucketListDetailsComponent implements OnInit {
  public editableString: string;

  @Input() bucketlist: Bucketlist;
  model: any = {};

  constructor(private bucketlistsService: BucketlistsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      console.log('getting bucketlist with id: ', id);
      this.bucketlistsService
        .get(id)
        .subscribe(p => {
          this.bucketlist = p,
            console.log(p);
        });
    });
  }

  ngOnDestroy() {
  }

  gotoBucketLists() {
    window.history.back();
  }
  isChecked(status: boolean, id: number, itemid: number) {
    let body: any;
    if (status) {
      body = JSON.stringify({ 'done': false });
      this.bucketlistsService
        .changeStatus(body, id, itemid)
        .subscribe(p => {
          this.bucketlistsService.get(id).subscribe((data) => {
            this.bucketlist = data;
          });
        });
    } else {
      body = JSON.stringify({ 'done': true });
      this.bucketlistsService
      .changeStatus(body, id, itemid)
      .subscribe(p => {
        this.bucketlistsService.get(id).subscribe((data) => {
          this.bucketlist = data;
        });
      });
    }
    console.log(body);
  }
  addItem() {
    this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      const body = JSON.stringify(this.model);
      this.bucketlistsService
        .addBucketlistItem(body, id)
        .subscribe(response => this.bucketlistsService.get(id).subscribe((data) => {
          this.bucketlist = data;
        }));
    });
  }

  deleteItem(id: number, itemid: number) {
    const disposable = this.dialogService.addDialog(ConfirmComponent, {
      title: 'Delete Bucketlist Item',
      message: 'Are you sure you want to delete this bucketlist'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          // alert('accepted');
          console.log('deleting bucketlist item with id: ', id);
          this.bucketlistsService
            .deleteBucketlistItem(Number(id), Number(itemid))
            .subscribe(p => {
              this.bucketlistsService.get(id).subscribe((data) => {
                this.bucketlist = data;
              });
            });
        }
      });
    setTimeout(() => {
      disposable.unsubscribe();
    }, 10000);
  }

  saveBucketlistDetails() {
    this.bucketlistsService
      .save(this.bucketlist)
      .subscribe(r => console.log(`saved!!! ${JSON.stringify(this.bucketlist)}`));
  }

}
