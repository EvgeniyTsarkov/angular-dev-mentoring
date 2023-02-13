import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class ValidatorsFactory {

    public dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const value = control.value;
        if (value && typeof value === 'string') {
            const match = value.match(/^(0?[0-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);
            if (!match) {
                // eslint-disable-next-line quote-props
                return { 'invalidDateFormat': true };
            }
        }
        return null;
    }

    public courseLengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const number = /^\d+$/.test(control.value) ? +control.value : NaN;

        // eslint-disable-next-line quote-props
        return number !== number ? { 'invalidCourseDuration': true } : null;
    }

    public authorsValidator(control: AbstractControl): { [key: string]: boolean } | null {

        console.log(control.value);
        // eslint-disable-next-line quote-props
        return control.value.length >= 1 ? null : { 'authorsInputInvalid': true };
    }
}
