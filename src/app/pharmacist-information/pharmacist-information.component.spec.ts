import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistInformationComponent } from './pharmacist-information.component';

describe('PharmacistInformationComponent', () => {
  let component: PharmacistInformationComponent;
  let fixture: ComponentFixture<PharmacistInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacistInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacistInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
