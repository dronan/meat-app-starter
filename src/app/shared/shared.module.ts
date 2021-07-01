import { LeaveOrderGuard } from './../order/leave-order.guard';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule, ModuleWithProviders} from '@angular/core';

import {RatingComponent} from './rating/rating.component';
import {RadioComponent} from './radio/radio.component';
import {InputComponent} from './input/input.component';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.sevice';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { OrderService } from 'app/order/order.service';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from './messages/notification.service';
import { LoginService } from 'app/security/login/login.service';
import { LoggedInGuard } from 'app/security/loggedin.guard';
import { UserDetailComponent } from 'app/header/user-detail/user-detail.component';


@NgModule({
    declarations:[RadioComponent, InputComponent, RatingComponent, SnackbarComponent, UserDetailComponent],
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    exports: [RadioComponent, InputComponent, RatingComponent, UserDetailComponent, CommonModule, ReactiveFormsModule, FormsModule, SnackbarComponent]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ShoppingCartService, LoggedInGuard, LeaveOrderGuard, LoginService, RestaurantsService, OrderService, NotificationService]
        }
    }
}