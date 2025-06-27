import { DecimalPipe, SlicePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { productImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, SlicePipe, productImagePipe, DecimalPipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {

  product = input.required<Product>();

imageUrl = computed(()=> {
    return `http://localhost:3000/api/files/product/${this.product().images[0]}`;
  } )

}
