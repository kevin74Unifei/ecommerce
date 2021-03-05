import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Customer } from '@core/models/customer.model';
import { OrderedMealDetailed, OrderStored } from '@core/models/order.model';
import { CustomerService } from '@core/services/customer.service';
import { NotificationService } from '@core/services/notification.service';
import { OrderService } from '@core/services/order.service';
import { environment } from '@env';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';

import { OrdersComponent } from './orders.component';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let notificationService: NotificationService;
  let customerService: CustomerService; 
  let orderService: OrderService;

  const dummyOrdersMeals: OrderedMealDetailed [] = [
    new OrderedMealDetailed(1, 1, "meal 1", "meal 1", 1, null), 
    new OrderedMealDetailed(2, 2, "meal 2", "meal 2", 2, null),
    new OrderedMealDetailed(3, 3, "meal 3", "meal 3", 3, null)
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule, 
        ToastrModule.forRoot(),
      ],
      declarations: [ OrdersComponent ]
    })
    .compileComponents();

    notificationService = TestBed.inject(NotificationService);  
    customerService = TestBed.inject(CustomerService);
    orderService = TestBed.inject(OrderService);
  }));

  beforeEach(() => {
    customerService.customer.next(new Customer(0, "name", "email", 'token', new Date()));
    spyOn(orderService, 'getOrders').and.callFake(() => {
      let orders: OrderStored[] = [
        new OrderStored(1, new Date(), "done", dummyOrdersMeals),
        new OrderStored(2, new Date(), "created", dummyOrdersMeals),
      ];

      return of(orders);
    });

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get an image url', () => {
    let imageName = "image.png";
    let id = 1; 

    expect(`${environment.ecommerceUrl}/${environment.meal}/image/${id}/${imageName}`)
      .toEqual(component.getImage(id, imageName));
  });

  it('should get total', () => {
    let total = 0;
    dummyOrdersMeals.forEach(meal => total += meal.price * meal.amount);

    expect(total).toEqual(component.getTotal(dummyOrdersMeals));
  });

  it('should render orders', () => {
    const orders = fixture.debugElement.nativeElement.querySelectorAll(".order-item");
    expect(orders.length).toEqual(2);
  });

  it('should not render message of empty orders', () => {
    let emptyMessageElement = fixture.debugElement.nativeElement.querySelector("#empty-orders-message");
    expect(emptyMessageElement).toBeFalsy();
  });

  it('should not render loader', () => {
    let loaderElement = fixture.debugElement.nativeElement.querySelector("#loader");
    expect(loaderElement).toBeFalsy();
  });

});
