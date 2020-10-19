import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'composeUrl'
})
export class ComposeUrlPipe implements PipeTransform {

  transform(value: string): string {
    return environment.server + `/${value}`;
  }

}
