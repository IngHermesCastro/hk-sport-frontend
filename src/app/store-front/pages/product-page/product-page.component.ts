import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { ProductCarouselComponent } from "../../../products/components/product-carousel/product-carousel.component";
import { CarruselImageComponent } from "../../../products/components/carrusel-image/carrusel-image.component";
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-product-page',
  imports: [RouterLink, CarruselImageComponent, DecimalPipe],
  // imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  //Producto que se va a mostrar en la pagina usando rxResource
  activateRouter = inject(ActivatedRoute);
  productService = inject(ProductsService);

  productIdSlug = this.activateRouter.snapshot.params['idSlug'];

  productResource = rxResource({
    request: () => ({ idSlug: this.productIdSlug }),
    loader: ({ request }) => {
      return this.productService.getProductByIdSlug(request.idSlug);
    },
  });

  //rxResource















//   @if (productResource.hasValue() ) {
// <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
//   <!-- imagenes -->
//    <product-carousel
//    [images] = "productResource.value().images"
//    ></product-carousel>

//   <div>
//     <h2 class="text-2xl font-bold">
//       {{ productResource.value().title}}
//     </h2>
//     <div class="divider"></div>
//     <p>
//       {{ productResource.value().description}}
//     </p>

//   </div>


// </div>
// }

}
