import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core"
import {Product,Order} from "../../_models/index";
import {OrderService,ProductsDataService} from "../../_services";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-shopping-cart",
    templateUrl: "./shopping-order.component.html"
})
export class ShoppingOrderComponent implements OnInit, OnDestroy {
    public cart: Order = new Order();

    public itemCount: number;

    public constructor(private productsService: ProductsDataService,
                       private cartService: OrderService,
                       private cdr:ChangeDetectorRef) {


    }
    public emptyOrder(): void {
        this.cartService.emptyOrdersEntry().subscribe();
    }

    public sendToApprove(): void {
        this.cartService.sendToApprove().subscribe(()=>this.loadCart());
    }


    public removeProductFromOrder(product: Product): void {
        this.cartService.removeProductFromOrder(product).subscribe(()=>this.loadCart());
    }

    public addProductToOrder(product: Product): void {
        this.cartService.addToOrder(product).subscribe((data)=>{
            this.loadCart();
        });
    }

    public loadCart(){
        this.cartService.get().subscribe((cart) => {
            this.itemCount = cart.entries.length;
            this.cart = cart;
            this.cdr.detectChanges();
        });
    }

    public ngOnInit(): void {


        this.loadCart();

        this.cartService.addToOrderEvent.subscribe((product:Product)=>{
            if(product)
                this.addProductToOrder(product);
        });

    }

    public ngOnDestroy(): void {

    }
}
