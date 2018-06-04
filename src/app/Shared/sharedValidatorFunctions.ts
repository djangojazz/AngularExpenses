import { Validators, ValidatorFn, AbstractControl, NG_VALIDATORS, FormControl } from "@angular/forms";
import { Directive } from "@angular/core";

function isNumeric(): ValidatorFn {
    return  (c: AbstractControl): {[key: string]: boolean} | null => {
        if (c.value !== undefined && (isNaN(parseFloat(c.value)) && isFinite(c.value))) {
            return { 'range': true };
        };
        return null;
        };
    }

@Directive({
    providers: [
        { provide: NG_VALIDATORS, useExisting: SharedValidatorFunctions, multi: true}
    ]
})

export class SharedValidatorFunctions {
    numberValidator: Function;

    constructor() {
        this.numberValidator = isNumeric();
    };

    validateNumber(c: FormControl) {
        return this.numberValidator(c);
    }
}

