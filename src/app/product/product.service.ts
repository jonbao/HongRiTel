
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ProductService {
    public productDetailURL = "mock-data/post-mock.json";
    public productListURL = "http://localhost:1234/api/products";
    public productListSearchURL = "mock-data/postlist-search-mock.json";

    constructor(public httpClient: HttpClient) {
    }

    public getProduct(id): Observable<any> {
        return this.httpClient.get(this.productListURL+"/"+id);
    }

    public getPostList(): Observable<any> {
        return this.httpClient.get(this.productListURL);
    }

    public getPostNumber(): number {
        return 0;
    }

    public postProduct(data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }        
        return this.httpClient.post(this.productListURL,
            JSON.stringify(data),
            httpOptions);
    }
    public putProduct(data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.httpClient.put(this.productListURL,
            JSON.stringify(data),
            httpOptions);
    }
    public deleteProduct(id): Observable<any> {
        return this.httpClient.delete(this.productListURL+"/"+id);
    }
    public deleteProducts(ids): Observable<any> {
        return this.httpClient.delete(this.productListURL+"/"+ids);
    }
    public async deleteProductsAsync(ids): Promise<Observable<any>> {
        return await this.httpClient.delete(this.productListURL+"/"+ids);
    }
    
    public search() {

    }
}

