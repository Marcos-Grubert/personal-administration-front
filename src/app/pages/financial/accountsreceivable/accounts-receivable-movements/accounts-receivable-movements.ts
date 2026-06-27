import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../../../core/components/sidebar/sidebar';
import { AccountsReceivableService } from '../../../../services/financial/accountsreceivable/accounts-receivable';
import { CustomerService } from '../../../../services/register/customers/customer';
import { ReceivableMovementService } from '../../../../services/financial/accountsreceivable/accounts-receivable-movements';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-accounts-receivable-movements',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SidebarComponent],
  templateUrl: './accounts-receivable-movements.html',
  styleUrl: './accounts-receivable-movements.scss'
})
export class AccountsReceivableMovementsComponent implements OnInit {
  filterForm!: FormGroup;
  openTitles: any[] = [];
  customers: any[] = [];
  
  private searchTerms = new Subject<string>();
  showPanel = false;
  selectedCustomerName = '';

  constructor(
    private fb: FormBuilder,
    private receivableService: AccountsReceivableService,
    private customerService: CustomerService,
    private receivableMovementService: ReceivableMovementService
  ) {}

  // Fecha o painel se clicar fora do container de busca
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-container')) {
      this.showPanel = false;
    }
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      startDate: ['2026-06-01', Validators.required],
      endDate: ['2026-06-30', Validators.required],
      customerId: [null]
    });

    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.customerService.searchCustomersForTerm(term).pipe(
          catchError(err => {
            console.error('Erro ao buscar clientes:', err);
            return of({ content: [] }); 
          })
        );
      })
    ).subscribe((data: any) => {
      this.customers = data.content || [];
      this.showPanel = this.customers.length > 0;
    });

    this.searchTitles();
  }

  onSearchCustomer(event: any): void {
    const term = event.target.value;
    this.searchTerms.next(term);
    
    if (!term || term.trim() === '') {
      this.clearCustomerFilter();
    }
  }

  selectCustomer(customer: any): void {
    this.selectedCustomerName = customer.name;
    this.filterForm.patchValue({ customerId: customer.id });
    this.showPanel = false;
    this.customers = [];
    // Opcional: dispara a busca automaticamente ao selecionar
    this.searchTitles();
  }

  clearCustomerFilter(): void {
    this.selectedCustomerName = '';
    this.filterForm.patchValue({ customerId: null });
    this.customers = [];
    this.showPanel = false;
    this.searchTitles();
  }

  searchTitles(): void {
    if (this.filterForm.valid) {
      const { startDate, endDate, customerId } = this.filterForm.value;
      this.receivableService.getPendingCollections(startDate, endDate, customerId).subscribe({
        next: (data: any) => {
          this.openTitles = (data.content || []).map((t: any) => ({
            ...t, 
            selected: false, 
            movementType: 1, 
            lowValue: t.remainingValue
          }));
        },
        error: (err) => console.error('Erro ao buscar títulos:', err)
      });
    }
  }

  onTipoChange(item: any): void {
    item.lowValue = item.remainingValue;
  }

  toggleAll(event: any): void {
    const checked = event.target.checked;
    this.openTitles.forEach(i => i.selected = checked);
  }

  processarBaixas(): void {
    const selecionados = this.openTitles.filter(t => t.selected);
    if (selecionados.length === 0) {
      alert('Selecione pelo menos um título.');
      return;
    }

    const payload = selecionados.map(t => ({
      customerId: t.id.customerId,
      document: t.id.document,
      movementValue: t.lowValue,
      interestValue: 0,
      discountValue: 0,
      movementType: Number(t.movementType),
      movementObservation: 'Baixa em lote'
    }));

    this.receivableMovementService.bulkCreate(payload).subscribe({
      next: () => {
        alert('Baixas processadas com sucesso!');
        this.searchTitles();
      },
      error: (err) => console.error('Erro:', err)
    });
  }
}