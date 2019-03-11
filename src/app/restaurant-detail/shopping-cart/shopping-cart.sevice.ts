import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";

export class ShoppingCartService {
   
    items: CartItem[] = []

    clear(){
        this.items = []
    }

    addItem(item: MenuItem){
        let foundItem = this.items.find(mItem => mItem.menuItem == item)
        
        if (foundItem){
            foundItem.quantity++
        } else {
            this.items.push(new CartItem(item))
        }
    
    }

    removeItem(item: CartItem){
        this.items.splice(this.items.indexOf(item), 1)
    }

    total(): number {
        return this.items
                    .map(item => item.value())
                    .reduce((a,b) => a + b, 0)
    }


}