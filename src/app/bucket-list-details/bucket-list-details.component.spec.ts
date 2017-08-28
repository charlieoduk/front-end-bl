import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketListDetailsComponent } from './bucket-list-details.component';

describe('BucketListDetailsComponent', () => {
  let component: BucketListDetailsComponent;
  let fixture: ComponentFixture<BucketListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
