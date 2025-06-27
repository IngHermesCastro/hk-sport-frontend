import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Gender, Product, ProductsResponse } from '@products/interfaces/product.interface';
import { Observable, of, tap, map, forkJoin, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '@auth/interfaces/user.interface';



const baseUrl = environment.baseUrl;
interface Options {
  limit?: number;
  offset?: number;
  gender?: string;

}

const emptyProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User,
}

@Injectable({ providedIn: 'root' })
export class ProductsService {

  private http = inject(HttpClient);
  private productCache = new Map<string, Product>();
  private productsCache = new Map<string, ProductsResponse>();

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 18, offset = 0, gender = '' } = options;
    const key = `${limit}-${offset}-${gender}`; // 9-0-''
    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    return this.http.get<ProductsResponse>(`${baseUrl}/products`, {
      params: {
        limit: limit,
        offset: offset,
        gender: gender,
      }
    }).pipe(
      tap((resp) => console.log())
    );

  }

  // Obtener el producto por id
  getProductByIdSlug(idSlug: string): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`);
  }

  getProductById(id: string): Observable<Product> {
    if (id === 'new') {
      return of(emptyProduct);
    }
    if (id === 'new') {
      return of(emptyProduct);
    }

    if (this.productCache.has(id)) {
      return of(this.productCache.get(id)!);
    }

    return this.http
      .get<Product>(`${baseUrl}/products/${id}`)
      .pipe(tap((product) => this.productCache.set(id, product)));
  }

  //metodo para actualizar un producto
  updateProduct(
  id: string,
  productLike: Partial<Product>,
  imageFileList?: FileList
): Observable<Product> {
  const currentImages = productLike.images ?? [];

  return this.uploadImages(imageFileList).pipe(
    map((imageNames) => ({
      ...productLike,
      images: [...currentImages, ...imageNames],
    })),
    switchMap((updatedProduct) =>
      this.http.patch<Product>(`${baseUrl}/products/${id}`, updatedProduct)
    ),
    tap((product) => this.updateProductCache(product))
  );
}

  //   return this.http
  //     .patch<Product>(`${baseUrl}/products/${id}`, productLike)
  //     .pipe(tap((product) => this.updateProductCache(product)));
  // }

  updateProductCache(product: Product) {
    const productId = product.id;

    this.productCache.set(productId, product);

    this.productsCache.forEach((productResponse) => {
      productResponse.products = productResponse.products.map(
        (currentProduct) =>
          currentProduct.id === productId ? product : currentProduct
      );
    });
    console.log('Caché actualizado');
  }

createProduct(productLike: Partial<Product>, imageFileList?: FileList): Observable<Product> {
  const currentImages = productLike.images ?? [];

  return this.uploadImages(imageFileList).pipe(
    map((imageNames) => ({
      ...productLike,
      images: [...currentImages, ...imageNames],
    })),
    switchMap((updatedProduct) =>
      this.http.post<Product>(`${baseUrl}/products`, updatedProduct)
    ),
    tap((product) => {
      this.productCache.set(product.id, product);
      this.productsCache.clear(); // Limpiar caché de productos
    })
  );
}


  //Tome un fileList(Objeto que tine una lista de Files) y lo suba
  // /api/files/product
  uploadImages(images?: FileList): Observable<string[]> {
    if (!images) return of([]);

    const uploadObservables = Array.from(images).map((imageFile) =>
      this.uploadImage(imageFile)
    );

    return forkJoin(uploadObservables).pipe(
      tap((imageNames) => console.log('Imágenes subidas:', imageNames)),
    );
  }

  uploadImage(imageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', imageFile)
    return this.http.post<{fileName: string}>(`${baseUrl}/files/product`, formData)
    .pipe(
      map((resp) => resp.fileName) // Extraer el nombre del archivo de la respuesta
    )
  }
}
