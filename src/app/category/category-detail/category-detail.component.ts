
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn,ValidationErrors, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';
import { CategoryService } from "../category.service";
import { ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  public category: any = {};
  constructor(public categoryDetailService:CategoryService, 
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
      params => this.getCategory(id)
    );
  }

  public Cancel(): void {
    window.history.back();
    //this._location.back();
  }
  public getCategory(id) {
    this.categoryDetailService
      .getCategory(id)
      .subscribe(
        data => this.category = data,
        error => console.error(error)
      );
  }
}

