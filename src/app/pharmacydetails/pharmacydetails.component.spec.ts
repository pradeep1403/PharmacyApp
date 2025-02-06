import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacydetailsComponent } from './pharmacydetails.component';

describe('PharmacydetailsComponent', () => {
  let component: PharmacydetailsComponent;
  let fixture: ComponentFixture<PharmacydetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacydetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
