import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NotificationMessage, NotificationType } from '@core/models/notificationMessage.model';
import { OrderedMealDetailed, OrderStored } from '@core/models/order.model';
import { CustomerService } from '@core/services/customer.service';
import { MealService } from '@core/services/meal.service';
import { NotificationService } from '@core/services/notification.service';
import { OrderService } from '@core/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: OrderStored[] = []; 
  isLoading = true; 

  constructor(
    private _orderService: OrderService,
    private _customerService: CustomerService,
    private _mealService: MealService,
    private _notificationService: NotificationService,
    private _titleService: Title
  ) {}

  ngOnInit(): void {
    this._orderService.getOrders(this._customerService.customer.value.id)
      .subscribe(orders => {
        this.orders = orders; 
        this.isLoading = false
      },error => {
        this._notificationService.sendMessage(new NotificationMessage(error, NotificationType.error));
        this.isLoading = false
      });

    this._titleService.setTitle("My Orders");
  }

  getImage(id: number, imageName: string): string{
    return this._mealService.getMealImage(id, imageName);
  }

  getTotal(meals: OrderedMealDetailed[]): number{
    var total = 0;
    meals.map(meal => total += meal.price * meal.amount);

    return total;
  }
}
