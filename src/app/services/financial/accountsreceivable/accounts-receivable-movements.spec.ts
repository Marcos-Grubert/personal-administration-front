import { TestBed } from '@angular/core/testing';

import { AccountsReceivableMovements } from './accounts-receivable-movements';

describe('AccountsReceivableMovements', () => {
  let service: AccountsReceivableMovements;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsReceivableMovements);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
