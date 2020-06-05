import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkDialogComponent } from './events-dialog.component';

describe('NetworkDialogComponent', () => {
  let component: NetworkDialogComponent;
  let fixture: ComponentFixture<NetworkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
