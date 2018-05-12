import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core"
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import {Product} from "../../_models/product.model";
import {Order} from "../../_models/order.model";
import {ProductsDataService} from "../../_services/products.service";
import {OrderService} from "../../_services";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html"
})
export class ShoppingOrderComponent implements OnInit, OnDestroy {
  public products: Observable<Product[]>;
  public cart: Observable<Order>;

  public itemCount: number;

  private cartSubscription: Subscription;

  public constructor(private productsService: ProductsDataService,
                     private cartService: OrderService) {
  }

  public emptyOrder(): void {
    this.cartService.emptyOrdersEntry().subscribe();
  }

  public sendToApprove(): void {
    this.cartService.sendToApprove().subscribe();
  }

  public ngOnInit(): void {
    this.products = this.productsService.all();
    this.cart = this.cartService.get();
    console.log(this.cart);
  
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.entries.length;
      console.log("asd", cart.entries.length);
    });
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
