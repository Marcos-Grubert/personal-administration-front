import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountsReceivableService } from '../../../../services/financial/accountsreceivable/accounts-receivable';
import { CustomerService } from '../../../../services/register/customers/customer';
import { SidebarComponent } from '../../../../core/components/sidebar/sidebar';

@Component({
  selector: 'app-accontsreceivablecreate',
  // 2. ADICIONADO SidebarComponent nos imports e REMOVIDO o RouterLink daqui (pois agora ele é usado na Sidebar)
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent], 
  templateUrl: './accontsreceivablecreate.html',
  styleUrl: './accontsreceivablecreate.scss',
})
export class AccountsReceivableCreateComponent {
  accountsreceivablecreateform: FormGroup;
  customers: any[] = [];
  showList = false;
  showModal = false;

  // LIXO REMOVIDO: As variáveis menuCadastros, menuFinancas, etc. foram apagadas daqui!

  constructor(
    private formBuilder: FormBuilder, 
    private accountsReceivableService: AccountsReceivableService,
    private customerService: CustomerService
  ) {
    this.accountsreceivablecreateform = this.formBuilder.group({
      customerCode: ['', Validators.required],
      customerName: ['', Validators.required],
      document: ['', Validators.required],
      destit: ['', Validators.required],
      originalValue: ['', [Validators.required, Validators.min(0.01)]],
      financialStatus: [2, Validators.required],
      originalDueDate: ['', Validators.required]
    });
  }

  onSearchCustomer(event: Event) {
    const term = (event.target as HTMLInputElement).value;

    if (term && term.length >= 2) {
      this.customerService.searchCustomersForTerm(term).subscribe({
        next: (data: any) => {
          this.customers = data.content; 
          this.showList = true;
        },
        error: (err: any) => console.error(err)
      });
    } else {
      this.customers = [];
      this.showList = false;
    }
  }

  selectCustomer(customer: any) {
    this.accountsreceivablecreateform.patchValue({
      customerCode: customer.id,
      customerName: customer.name
    });
    this.showList = false;
    this.showModal = false;
    this.customers = [];
  }

  onSubmit() {
    if (this.accountsreceivablecreateform.valid) {
      const payload = { ...this.accountsreceivablecreateform.value };
      delete payload.customerName;

      this.accountsReceivableService.create(payload).subscribe({
        next: () => {
          alert('Título criado com sucesso!');
          this.accountsreceivablecreateform.patchValue({
            document: '',
            destit: '',
            originalValue: '',
            originalDueDate: '',
            financialStatus: 2
          });

          Object.keys(this.accountsreceivablecreateform.controls).forEach(key => {
            if (key !== 'customerCode' && key !== 'customerName') {
              const control = this.accountsreceivablecreateform.get(key);
              control?.markAsPristine();
              control?.markAsUntouched();
              control?.updateValueAndValidity();
            }
          });
        },
        error: (err: any) => console.error(err)
      });
    }
  }
}