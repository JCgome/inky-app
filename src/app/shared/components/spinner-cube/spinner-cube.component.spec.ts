import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerCubeComponent } from './spinner-cube.component';

describe('SpinnerCubeComponent', () => {
  let component: SpinnerCubeComponent;
  let fixture: ComponentFixture<SpinnerCubeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerCubeComponent]
    });
    fixture = TestBed.createComponent(SpinnerCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
