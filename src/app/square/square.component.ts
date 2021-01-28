import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button [ngClass]="type ? 'queen' : 'default'"> {{ type ? 'Q' : col.toUpperCase()+ (row+1) }}</button>
  `,
  styles: ['button { width: 35px; height: 35px; } .queen { background: #4CAF50; }']
})
export class SquareComponent {
  @Input() row: number;
  @Input() col: string;
  @Input() type: boolean;
}