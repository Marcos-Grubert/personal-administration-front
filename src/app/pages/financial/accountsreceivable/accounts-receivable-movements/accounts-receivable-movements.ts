import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../../../core/components/sidebar/sidebar';
import { AccountsReceivableService } from '../../../../services/financial/accountsreceivable/accounts-receivable';
import { CustomerService } from '../../../../services/register/customers/customer';
import { ReceivableMovementService } from '../../../../services/financial/accountsreceivable/accounts-receivable-movements';

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

  constructor(
    private fb: FormBuilder,
    private receivableService: AccountsReceivableService,
    private customerService: CustomerService,
    private receivableMovementService: ReceivableMovementService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      startDate: ['2026-06-01', Validators.required],
      endDate: ['2026-06-30', Validators.required],
      customerId: [null]
    });
    
    this.loadCustomers('');
    this.searchTitles();
  }

  loadCustomers(term: string): void {
    this.customerService.searchCustomersForTerm(term).subscribe({
      next: (data) => this.customers = data,
      error: (err) => console.error('Erro ao buscar clientes:', err)
    });
  }

  searchTitles(): void {
    if (this.filterForm.valid) {
      const { startDate, endDate, customerId } = this.filterForm.value;
      this.receivableService.getPendingCollections(startDate, endDate, customerId).subscribe({
        next: (data: any) => {
          this.openTitles = (data.content || []).map((t: any) => ({
            ...t, 
            selected: false, 
            movementType: 1, // Default para Baixa
            lowValue: t.remainingValue
          }));
        },
        error: (err) => console.error('Erro ao buscar títulos:', err)
      });
    }
  }

  onTipoChange(item: any): void {
    // Sugere valor total ao trocar o tipo de operação
    item.lowValue = item.remainingValue;
  }

  toggleAll(event: any): void {
    const checked = event.target.checked;
    this.openTitles.forEach(i => i.selected = checked);
  }

  processarBaixas(): void {
    const selecionados = this.openTitles.filter(t => t.selected);
    
    if (selecionados.length === 0) {
      alert('Selecione pelo menos um título para processar.');
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
      error: (err) => {
        console.error('Erro ao processar baixas:', err);
        alert('Erro ao processar as baixas. Verifique o console.');
      }
    });
  }
}