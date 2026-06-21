import { TestBed } from '@angular/core/testing';

import { AccountsReceivable } from './accounts-receivable';

describe('AccountsReceivable', () => {
  let service: AccountsReceivable;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsReceivable);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
