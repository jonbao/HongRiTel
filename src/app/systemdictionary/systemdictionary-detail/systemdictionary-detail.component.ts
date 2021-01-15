
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn,ValidationErrors, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';
import { SystemDictionaryService } from "../systemdictionary.service";
import { ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
@Component({
  selector: 'app-systemdictionary-detail',
  templateUrl: './systemdictionary-detail.component.html',
  styleUrls: ['./systemdictionary-detail.component.scss']
})
export class SystemDictionaryDetailComponent implements OnInit {
  public systemdictionary: any = {};
  constructor(public systemdictionaryDetailService:SystemDictionaryService, 
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
      params => this.getSystemDictionary(id)
    );
  }

  public Cancel(): void {
    window.history.back();
    //this._location.back();
  }
  public getSystemDictionary(id) {
    this.systemdictionaryDetailService
      .getSystemDictionary(id)
      .subscribe(
        data => this.systemdictionary = data,
        error => console.error(error)
      );
  }
}

