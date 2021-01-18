
import { HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../product.service";
import { TestBed } from '@angular/core/testing';
import { forkJoin } from 'rxjs';  // RxJS 6 syntax
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalVariable } from '../../../global';

@Injectable({ providedIn: 'root' })
export class RandomProductService {
  ProductUrl = GlobalVariable.BASE_API_URL + 'api/products';

  getProducts(
    pageIndex: number,
    pageSize: number,
    sortField: string|"",
    sortOrder: string|"",
    searchKeyWord: string|"",
    filters: Array<{ key: string; value: string[] }>
  ): Observable<HttpResponse<any>> {
    let params = new HttpParams()
      .append('PageNumber', `${pageIndex}`)
      .append('PageSize', `${pageSize}`)
      .append('OrderBy', `${sortField}`)
      .append('SortOrder', `${sortOrder}`)
      .append('SearchKeyWord', `${searchKeyWord}`);
    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });
    console.log("params",params);
    return this.http.get(`${this.ProductUrl}`, { params, observe: 'response'});
  }
  Test(){

    this.http.get(this.ProductUrl,{
      params: {
        count: String(1)
      },
      observe: 'response'
    }).subscribe(  (data: HttpResponse<any>) => {
      console.log("data.headers123");
      console.log(data);
      console.log(data.headers.get("x-pagination"));
    });

    // this.http.get(this.ProductUrl,{observe: 'response'}).subscribe(  (data: HttpResponse<any>) => {
    //     console.log("data.headers123");
    //     console.log(data);
    //     console.log(data.headers.get("x-pagination"));
    // });

  }
  constructor(private http: HttpClient) {}
}

@Component({
  selector: 'app-product-list',  
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  //public productList: Array<any>;
  total = 1;
  listOfRandomProduct: Array<any>;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  checked = false;
  indeterminate = false;
  searchKeyWord = "";
  CategorySortOrder = "";
  firstRun = true;
  setOfCheckedId = new Set<string>();
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfRandomProduct.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfRandomProduct.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];  
  onAllChecked(value: boolean): void {
    this.listOfRandomProduct.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }
  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfRandomProduct.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfRandomProduct.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  filterGender = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' }
  ];
  public SearchProduct(): void {
    this.pageIndex = 1;
    this.CategorySortOrder = null;
    this.setOfCheckedId = new Set<string>();
    localStorage.removeItem("searchKeyWord");
    localStorage.removeItem("pageIndex");
    localStorage.removeItem("pageSize");
    localStorage.removeItem("sortField");
    localStorage.removeItem("sortOrder");    
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, this.searchKeyWord, []);
  }
  public AddProduct(): void {
    this.router.navigateByUrl("Product/ProductOpe/");
  }
  public ModifyProduct(id): void {
    this.router.navigateByUrl("Product/ProductOpe/" + id);
  }
  public ViewProduct(id): void {
    this.router.navigateByUrl("Product/ProductDetail/" + id);
  }
  public deleteRow(id): void {
    this.productDetailService.deleteProduct(id).toPromise().then(()=>{
      this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, this.searchKeyWord, [])
      this.createMessage('success','删除成功。');}
      )
      .catch(error=>{
        console.error(error);
        this.createMessage('error','删除失败。');
      }); 
  }
  public DeleteProducts():void {
    var ids = this.ConvertToStrs();
    this.productDetailService.deleteProducts(ids).toPromise().then(()=>{
        this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, this.searchKeyWord, []);
        this.createMessage('success','删除成功。');}
      )
      .catch(error=>{
        console.error(error);
        this.createMessage('error','删除失败。');
      });  
  }
  public requestDataFromMultipleSources(): Observable<any[]> {
    var ids = this.ConvertToStrs();    
    let response1 = this.productDetailService.deleteProducts(ids);
    let response2 = this.randomProductService.getProducts(this.pageIndex, this.pageSize, null, null, this.searchKeyWord, []);
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    const observable = new Observable(function subscribe(subscriber) {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.complete();
    });
    // const observablePromise = obervable.toPromise();
    // response1.toPromise().then(response2)
    return forkJoin([response1, response2]);
  }
  public ConvertToStrs()
  {
    var str = "(^";
    this.setOfCheckedId.forEach(element => {
      str += "," + element;
    });
    return str.replace("^,","")+")";
  }
  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    searchKeyWord: string | null, 
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;
    this.randomProductService.getProducts(pageIndex, pageSize, sortField, sortOrder,searchKeyWord, filter).subscribe( data => {
      this.loading = false;
      var json = JSON.parse(data.headers.get("x-pagination"));
      this.total = json.totalCount;
      this.listOfRandomProduct = data.body;
      if(this.listOfRandomProduct.length == 0)
      {
        this.pageIndex = this.pageIndex - 1;
        if(this.pageIndex <= 1) this.pageIndex = 1;
      }      
      localStorage.setItem("searchKeyWord",searchKeyWord);
      localStorage.setItem("pageIndex",pageIndex.toString());
      localStorage.setItem("pageSize",pageSize.toString());
      localStorage.setItem("sortField",sortField);
      localStorage.setItem("sortOrder",sortOrder);
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    if(this.firstRun)
    {
      this.firstRun = false;
      return;
    }
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => (item.value !== null) && (item.value !== ""));
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    //{ 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
    //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, this.searchKeyWord, filter);
    this.pageIndex = pageIndex; 
  }
  public createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
  constructor(
    private message: NzMessageService,
    public productDetailService:ProductService, 
    private randomProductService: RandomProductService, 
    public router: Router,
    public activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.searchKeyWord = localStorage.getItem('searchKeyWord')=="null"?"":localStorage.getItem('searchKeyWord');
    if(Number(localStorage.getItem('pageIndex')) != 0){
      this.pageIndex = Number(localStorage.getItem('pageIndex'));
    }
    if(Number(localStorage.getItem('pageSize')) != 0){
      this.pageSize = Number(localStorage.getItem('pageSize'));
    }
    if(localStorage.getItem('sortField') == "Category"){
      this.CategorySortOrder = localStorage.getItem('sortOrder');
    }
    this.loadDataFromServer(this.pageIndex, this.pageSize, localStorage.getItem('sortField'), localStorage.getItem('sortOrder'), this.searchKeyWord, []);
  }
}


