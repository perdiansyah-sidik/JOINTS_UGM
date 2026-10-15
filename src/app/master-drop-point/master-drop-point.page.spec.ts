import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterDropPointPage } from './master-drop-point.page';

describe('MasterDropPointPage', () => {
  let component: MasterDropPointPage;
  let fixture: ComponentFixture<MasterDropPointPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDropPointPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
