import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './../Model/Product';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(value: Product[], args?: number): any {
    try {
      if(args != 999) {
return value.filter(x=>x.CategoryId == args);
      } else {
        return value;
      }

    }catch(e) {

    }
    
  }

}
