import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import {Product} from "../../_models/product.model";
import {ProductsDataService} from "../../_services/products.service";
import {OrderService} from "../../_services";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-store-front",
  styleUrls: ["./store-front.component.css"],
  templateUrl: "./store-front.component.html"
})
export class StoreFrontComponent implements OnInit {
  public products: Observable<Product[]>;

  public constructor(private productsService: ProductsDataService,
                     private cartService: OrderService) {
  }

  public addProductToOrder(product: Product): void {
   this.cartService.addItem(product).subscribe();
  }

  public removeProductFromOrder(product: Product): void {
    this.cartService.removeItem(product).subscribe();
  }

  public productInOrder(product: Product): boolean {

    return Observable.create((obs: Observer<boolean>) => {
      console.log("Reis");
      const sub = this.cartService
                      .get()
                      .subscribe((cart) => {
                        obs.next(cart.entries.some( (i) => i.product === product.id) );
                        obs.complete();
                      });
      sub.unsubscribe();
    });
  }

  public ngOnInit(): void {
    this.products = this.productsService.all();
  }
}
