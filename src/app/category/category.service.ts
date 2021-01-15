
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class CategoryService {
    public categoryDetailURL = "mock-data/post-mock.json";
    public categoryListURL = "http://localhost:1234/api/categorys";
    public categoryListSearchURL = "mock-data/postlist-search-mock.json";

    constructor(public httpClient: HttpClient) {
    }

    public getCategory(id): Observable<any> {
        return this.httpClient.get(this.categoryListURL+"/"+id);
    }

    public getPostList(): Observable<any> {
        return this.httpClient.get(this.categoryListURL);
    }

    public getPostNumber(): number {
        return 0;
    }

    public postCategory(data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }        
        return this.httpClient.post(this.categoryListURL,
            JSON.stringify(data),
            httpOptions);
    }
    public putCategory(data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.httpClient.put(this.categoryListURL,
            JSON.stringify(data),
            httpOptions);
    }
    public deleteCategory(id): Observable<any> {
        return this.httpClient.delete(this.categoryListURL+"/"+id);
    }
    public deleteCategorys(ids): Observable<any> {
        return this.httpClient.delete(this.categoryListURL+"/"+ids);
    }
    public async deleteCategorysAsync(ids): Promise<Observable<any>> {
        return await this.httpClient.delete(this.categoryListURL+"/"+ids);
    }
    
    public search() {

    }
}

