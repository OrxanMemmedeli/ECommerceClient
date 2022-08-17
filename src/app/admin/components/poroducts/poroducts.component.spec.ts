import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoroductsComponent } from './poroducts.component';

describe('PoroductsComponent', () => {
  let component: PoroductsComponent;
  let fixture: ComponentFixture<PoroductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoroductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoroductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
