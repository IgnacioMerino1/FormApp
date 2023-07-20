import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {
    
    public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    
    public cantBeStrider = (control: FormControl):ValidationErrors | null => {
    
        const value: string = control.value.trim().toLowerCase();
        if(value === 'strider') {
            return { noStrider: true, }
        }
    
        return null;
    }

    public isValidField(form: FormGroup, campo: string) {
        return form.controls[campo].errors && form.controls[campo].touched;
    }

    isFieldOneEqualFieldTwo(campo: string, campo2: string) {
        return ( formGroup: FormGroup) :ValidationErrors | null => {
            const valor1 = formGroup.get(campo)?.value;
            const valor2 = formGroup.get(campo2)?.value;

            if(valor1 !== valor2 ) {
                formGroup.get(campo2)?.setErrors({ notEqual: true });
                return { notEqual: true }
            }

            formGroup.get(campo2)?.setErrors(null);     // Necesario?
            return null;
    }
    }
    
}