import {OrderEntry} from "./order-entry.model";
import { User } from ".";

export class Order {
  public entries: OrderEntry[] = new Array<OrderEntry>();
  public sendToApprove: boolean = false;
  public approved: boolean = false;
  public id: number;
  public user: User;

  public updateFrom(src: Order) {
    this.entries = src.entries;
    this.sendToApprove = src.sendToApprove;
    this.approved = src.approved;
  }
}
