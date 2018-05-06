import {OrderEntry} from "./order-entry.model";

export class Order {
  public entries: OrderEntry[] = new Array<OrderEntry>();
  public sendToApprove: boolean = false;
  public approved: boolean = false;

  public updateFrom(src: Order) {
    this.entries = src.entries;
    this.sendToApprove = src.sendToApprove;
    this.approved = src.approved;
  }
}
