import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import {API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {Order,Product} from "../_models";


@Injectable()
export class OrderService {

    public constructor(private http: HttpClient) {

    }

    addItem(product: Product):Observable<any>{
        let productId = product.id;
        const url = `/order/product/${productId}/add`;
        return this.http.get(API_URL + url)
    } 

    removeItem(product: Product): Observable<any> {
        let productId = product.id;
        const url = `/order/product/${productId}/remove`;
        return this.http.get<any>(API_URL + url);
    }

    public get(): Observable<Order> {
        return this.http.get<Order>(API_URL+"/order/my-order");
    }

    emptyOrdersEntry(): Observable<any> {
        console.log(API_URL+ "/order/order-entries/empty");
        return this.http.get(API_URL + "/order/order-entries/empty");
    }

    sendToApprove(): Observable<any> {
        console.log(API_URL + "/order/send-to-approve");
        return this.http.get(API_URL + "/order/send-to-approve");
    }
}

