import { Pipe, PipeTransform } from '@angular/core';
import { ProductImg } from '../models';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imgUrl'
})
export class ImgUrlPipe implements PipeTransform {

  transform(value: Array<ProductImg>): string {
    console.log(value);
    if (value && value.length > 0) {
      return environment.baseUrl + value[0].url;
    }
    return 'assets/images/noimage.png';
  }

}
