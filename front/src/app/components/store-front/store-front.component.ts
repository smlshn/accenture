import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import {Product} from "../../_models/product.model";
import {ProductsDataService} from "../../_services/products.service";
import {OrderService} from "../../_services";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-store-front",
  styleUrls: ["./store-front.component.scss"],
  templateUrl: "./store-front.component.html"
})
export class StoreFrontComponent implements OnInit {
  public products: Observable<Product[]>;

  public constructor(private productsService: ProductsDataService,
                     private cartService: OrderService) {
  }

  public addProductToOrder(product: Product): void {
    this.cartService.addItem(product, 1);
  }

  public removeProductFromOrder(product: Product): void {
    this.cartService.addItem(product, -1);
  }

  public productInOrder(product: Product): boolean {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this.cartService
                      .get()
                      .subscribe((cart) => {
                        obs.next(cart.entries.some((i) => i.product === product.id));
                        obs.complete();
                      });
      sub.unsubscribe();
    });
  }

  public ngOnInit(): void {
    this.products = this.productsService.all();
  }
}
