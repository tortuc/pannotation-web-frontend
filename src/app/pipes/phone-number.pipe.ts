import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

@Pipe({
    name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
    transform(value: any): any {
        return parsePhoneNumberFromString(value).formatInternational();
    }
}
