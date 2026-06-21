export interface ReceivableMovement {
  id: string;
  document: string;
  originalValue: number;
  selected: boolean;
  movementType: 'TOTAL' | 'PARCIAL' | 'CANCELAMENTO' | 'CANCELAMENTO_PARCIAL';
  lowValue: number;
}