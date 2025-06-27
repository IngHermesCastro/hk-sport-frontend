import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'productImage',
})
export class productImagePipe implements PipeTransform {
  transform(value: null| string | string[]): string {

    if(value === null || value === undefined) {
      return './assets/images/no-image.jpg';

    }

    if (typeof value === 'string' && value.startsWith('blob:')) {
      return value;
    }

    if (typeof value === 'string') {
      return `${baseUrl}/files/product/${value}`

    }

    const image = value.at(0);

    if (!image) {
      return './assets/images/no-image.jpg'
    }
    return `${baseUrl}/files/product/${image}`
  }
  //array > 1 = primer elemento
  // string = string
  // placeholder image : ./assets/images/no-image.jpg

  // imageUrl = computed(()=> {
  //   return `http://localhost:3000/api/files/product/${this.product().images[0]}`;
  // } )



}
