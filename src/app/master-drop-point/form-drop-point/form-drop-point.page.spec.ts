import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormDropPointPage } from './form-drop-point.page';

describe('FormDropPointPage', () => {
  let component: FormDropPointPage;
  let fixture: ComponentFixture<FormDropPointPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDropPointPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
