import { Component, OnInit } from '@angular/core';
import { OrderedMealDetailed, OrderStored } from '@core/models/order.model';
import { CustomerService } from '@core/services/customer.service';
import { OrderService } from '@core/services/order.service';
import { environment } from '@env';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: OrderStored[] = []; 

  constructor(
    private _orderService: OrderService,
    private _customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this._orderService.getOrders(this._customerService.customer.value.id)
      .subscribe(orders => this.orders = orders);
  }

  getImage(id: number, imageName: string): string{
    return environment.apiUrl + environment.mealUrl + "/image/" + id + "/" + imageName;
  }

  getTotal(meals: OrderedMealDetailed[]): number{
    var total = 0;
    meals.forEach(meal => total += meal.price * meal.amount)

    return total;
  }
}
