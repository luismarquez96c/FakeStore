import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product | null = null;

  constructor(private activatedRoute : ActivatedRoute,
    private productsService : ProductsService,
    private location : Location) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .pipe(
      switchMap( params => {
        const id = params.get('id');
        if(!id) throw Error('Product no encontrado') ;
        return this.productsService.getOne(id);
      }),
    )
    .subscribe( product => {
      this.product = product;
    } );
  }


  goToBack(){
    this.location.back();
  }
}
