import { Validators, ValidatorFn, AbstractControl, NG_VALIDATORS, FormControl } from "@angular/forms";
import { Directive } from "@angular/core";

function isNumeric(): ValidatorFn {
    return  (c: AbstractControl): {[key: string]: boolean} | null => {
        if (c.value !== undefined && (isNaN(c.value))) {
            return { 'isNumeric': true };
        };
        return null;
        };
    }

@Directive({
    selector: '[ngModel]'
})

export class SharedValidatorFunctions {
    numberValidator: Function = isNumeric();
    }

