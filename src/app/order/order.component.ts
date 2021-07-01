import {FormGroup, FormBuilder, FormControl, Validators, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order , OrderItem} from './order.model';
import 'rxjs/add/operator/do'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup
  delivery: number = 8

  orderId: string; 

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  numberPattern = /^[0-9]*$/;

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Crédito', value: 'REF'},
    {label: 'Cartão de Débito', value: 'DEB'}
  ]

  constructor(private orderService: OrderService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = new FormGroup({
      name: new FormControl('', { 
        validators: [Validators.required, Validators.minLength(5)]
      }),
      email: new FormControl('', { 
        validators: [Validators.required, Validators.pattern(this.emailPattern)] 
      }),
      emailConfirmation: new FormControl('', { 
        validators: [Validators.required, Validators.pattern(this.emailPattern)] 
      }),
      address: new FormControl('', { 
        validators: [Validators.required, Validators.minLength(5)] 
      }),
      number: new FormControl('', { 
        validators: [Validators.required, Validators.pattern(this.numberPattern)] 
      }),
      optionalAddress: new FormControl(''),
      paymentOption: new FormControl('', {
        validators:[Validators.required],
        updateOn: 'change'
      })
    }, 
    { validators: [OrderComponent.equalsTo], updateOn: 'blur' });
  }

  static equalsTo(group: AbstractControl): {[key:string]: boolean} {
    
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    
    if(!email || !emailConfirmation){
      return undefined
    }

    if(email.value !== emailConfirmation.value) {
      return {emailsNotMatch:true}
    }

    return undefined
  
  }

  itemsValue(): number{
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[]{
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem){
    return this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem){
    return this.orderService.decreaseQty(item)
  }


  remove(item: CartItem){
    return this.orderService.remove(item)
  }

  checkOrder(order: Order){
    order.orderItems = this.cartItems()
        .map((item:CartItem) => new OrderItem(item.quantity, item.menuItem.id))

    this.orderService.checkOrder(order)
                     .do( (orderId: string) => this.orderId = orderId )                  
                     .subscribe( (orderId: string) => {
      this.router.navigate(['/order-summary'])
      this.orderService.clear()
    })

    console.log(order)
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined;
  }


}
