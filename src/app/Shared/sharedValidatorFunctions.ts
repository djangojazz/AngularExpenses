import { Validators, ValidatorFn, AbstractControl, NG_VALIDATORS, FormControl } from "@angular/forms";
import { Directive } from "@angular/core";
import { CategoriesService } from "../Services/categories.service";
import { Category } from "../Models/category";

function isNumeric(): ValidatorFn {
    return  (c: AbstractControl): {[key: string]: boolean} | null => {
        if (c.value !== undefined && (isNaN(c.value))) {
            return { 'isNumeric': true };
        };
        return null;
        };
    }

function isCategory(cats: string[]): ValidatorFn {
    return  (c: AbstractControl): {[key: string]: boolean} | null => {
        if (c.value !== undefined && cats.find(x => x == c.value) ) {
            return { 'isCategory': true };
        };
        return null;
        };
    }


@Directive({
    selector: '[ngModel]'
})

export class SharedValidatorFunctions {
    constructor(private catService: CategoriesService) {}
    numberValidator: Function = isNumeric();
    categoryValidator: Function = isCategory(this.catService.Categories.map<string>(x => x.description));
    }
