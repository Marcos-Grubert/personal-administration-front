import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsReceivableMovementsComponent } from './acconts-receivable-movements';

describe('AccontsReceivableMovements', () => {
  let component: AccountsReceivableMovementsComponent;
  let fixture: ComponentFixture<AccountsReceivableMovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsReceivableMovementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountsReceivableMovementsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
