import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import {Product} from "../_models/product.model";
import {API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class ProductsDataService {
  private products: Observable<Product[]>;

  public constructor(private http: HttpClient) {

  }

  public all(): Observable<Product[]> {

    return this.http.get(API_URL+"/product/list")
        .map((res: any) =>{
              return <Product[]>res.map(item => {
                  return item;
              });
          });

  }
}
