import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class CustomerService {
    public customerDetailURL = "mock-data/post-mock.json";
    public customerListURL = "http://localhost:1234/api/customers";
    public customerListSearchURL = "mock-data/postlist-search-mock.json";

    constructor(public httpClient: HttpClient) {
    }

    public getPost(): Observable<any> {
        return this.httpClient.get(this.customerDetailURL);
    }

    public getPostList(): Observable<any> {
        return this.httpClient.get(this.customerListURL);
    }

    public getPostNumber(): number {
        return 0;
    }

    public addPost() {

    }

    public search() {

    }
}
