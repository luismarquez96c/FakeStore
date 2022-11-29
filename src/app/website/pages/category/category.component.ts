import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  template: `<app-products
             [productId]="productId"
             (loadMore)="onLoadMore()"
             [products]="products">
             </app-products>`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  products: Product[] = [];
  limit = 10;
  offset = 0;
  productId: string | null = null;

  constructor(private route: ActivatedRoute,
    private productsService: ProductsService) { }

  ngOnInit(): void {
    this.readParamsMap();
    this.readQueryParamsMap();
  }

  readParamsMap(){
    this.route.paramMap
    .pipe(
      switchMap( params => {
      this.categoryId = params.get('id');
      if(!this.categoryId) return [];

      return this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
      })
    )
    .subscribe( products => {
      this.products = products;
    });
  }

  readQueryParamsMap(){
    this.route.queryParamMap
    .subscribe( params => {
      this.productId = params.get('product');
    });
  }

  onLoadMore() {
    if(!this.categoryId) return;

    this.productsService.getByCategory(this.categoryId, this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

}
