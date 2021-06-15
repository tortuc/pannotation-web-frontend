import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'arrayUppercase'
})
export class ArrayUppercasePipe implements PipeTransform {
    transform(items: string[]): string[] {
        items.forEach((item, index) => items[index] = item.toUpperCase());
        return items;
    }
}
