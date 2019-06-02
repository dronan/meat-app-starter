import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {RatingComponent} from './rating/rating.component';
import {RadioComponent} from './radio/radio.component';
import {InputComponent} from './input/input.component';


@NgModule({
    declarations:[RadioComponent, InputComponent, RatingComponent],
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    exports: [RadioComponent, InputComponent, RatingComponent, CommonModule, ReactiveFormsModule, FormsModule]
})

export class SharedModule {}