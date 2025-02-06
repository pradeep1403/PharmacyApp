import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageHoursComponent } from './storage-hours.component';

describe('StorageHoursComponent', () => {
  let component: StorageHoursComponent;
  let fixture: ComponentFixture<StorageHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageHoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
