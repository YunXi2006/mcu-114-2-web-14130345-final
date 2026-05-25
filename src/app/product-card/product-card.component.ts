import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input({ required: true, transform: numberAttribute })
  id!: number;

  @Input()
  productName!: string;

  @Input()
  author!: string;

  @Input()
  company!: string;

  @Input()
  photoUrl!: string;

  onSetDisplay(isShow: boolean): void {
    this.isShow = isShow;
  }

  @Input({ transform: booleanAttribute })
  isShow!: boolean;
}
