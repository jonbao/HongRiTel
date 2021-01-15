
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn,ValidationErrors, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';
import { ExchangeRateService } from "../exchangerate.service";
import { ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
@Component({
  selector: 'app-exchangerate-detail',
  templateUrl: './exchangerate-detail.component.html',
  styleUrls: ['./exchangerate-detail.component.scss']
})
export class ExchangeRateDetailComponent implements OnInit {
  public exchangerate: any = {};
  constructor(public exchangerateDetailService:ExchangeRateService, 
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
      params => this.getExchangeRate(id)
    );
  }

  public Cancel(): void {
    window.history.back();
    //this._location.back();
  }
  public getExchangeRate(id) {
    this.exchangerateDetailService
      .getExchangeRate(id)
      .subscribe(
        data => this.exchangerate = data,
        error => console.error(error)
      );
  }
}

