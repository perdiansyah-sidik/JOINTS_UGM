import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardPengelolaPage } from './dashboard-pengelola.page';

declare const describe: (description: string, specDefinitions: () => void) => void;
declare const beforeEach: (action: () => void) => void;
declare const it: (expectation: string, assertion: () => void) => void;
declare const expect: <T>(actual: T) => { toBeTruthy(): void };

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
