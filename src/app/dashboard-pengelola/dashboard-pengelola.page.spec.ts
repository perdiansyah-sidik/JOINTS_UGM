import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardPengelolaPage } from './dashboard-pengelola.page';

describe('DashboardPengelolaPage', () => {
  let component: DashboardPengelolaPage;
  let fixture: ComponentFixture<DashboardPengelolaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPengelolaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
