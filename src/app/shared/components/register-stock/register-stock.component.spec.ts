import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStockComponent } from './register-stock.component';

describe('RegisterStockComponent', () => {
  let component: RegisterStockComponent;
  let fixture: ComponentFixture<RegisterStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterStockComponent]
    });
    fixture = TestBed.createComponent(RegisterStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
