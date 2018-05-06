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

    public addItem(product: Product, quantity: number): void {

    }

    public get(): Observable<Order> {
        return this.http.get<Order>(API_URL+"/api/order/my-order");

    }

}
