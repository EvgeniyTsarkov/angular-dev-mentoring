import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ValidatorsFactory } from './validators-factory.validators';

@Directive({
  selector: '[appDateField]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ValidateDateDirective, multi: true }
  ]
})
export class ValidateDateDirective implements Validator {

  public constructor(private readonly courseValidators: ValidatorsFactory) {
  }

  public validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.courseValidators.dateValidator(control);
  }
}
