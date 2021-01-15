
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn,ValidationErrors, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';
import { ProductService } from "../product.service";
import { ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public product: any = {};
  constructor(public productDetailService:ProductService, 
    public router: Router,
    public activeRoute: ActivatedRoute,
    private _location: Location,
    private fb: FormBuilder) {
    //constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    var id:string;
    this.activeRoute.paramMap.subscribe(params => {
      //console.log("id123",params.get('id'));
      id = params.get('id');
    });
    this.activeRoute.params.subscribe(
      params => this.getProduct(id)
    );
  }

  public Cancel(): void {
    window.history.back();
    //this._location.back();
  }
  public getProduct(id) {
    this.productDetailService
      .getProduct(id)
      .subscribe(
        data => this.product = data,
        error => console.error(error)
      );
  }
}

