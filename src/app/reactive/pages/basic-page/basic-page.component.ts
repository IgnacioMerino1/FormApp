import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const rtx5090 = {
  price: 0,
  inStorage: 0,
};


@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

//    public myForm: FormGroup = new FormGroup({
//      // Cada elemento; valor inicial, validaciones sincronas, validaciones asincronas
//      name: new FormControl('', [], []),
//      price: new FormControl(0, [], []),
//      inStorage: new FormControl(0, [], []),
//    });

  
    // Igual que el anterior pero con FormBuilder
    public myForm: FormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      inStorage: [0, [Validators.required, Validators.min(0)]],
    })

    constructor( private fb: FormBuilder ) {}

    ngOnInit(): void {
      //this.myForm.reset(rtx5090);
    }

    isValidField( campo: string ):boolean|null {

      return this.myForm.controls[campo].errors
        && this.myForm.controls[campo].touched;
    }

    getFieldError( campo: string ):string|null {
      if( !this.myForm.controls[campo] ) return null;

      const errores = this.myForm.controls[campo].errors || {};

      for (const key of Object.keys(errores)) {
        switch(key) {
          case 'required':
            return 'Este campo es requerido';
          case 'minlength':
            return `Mínimo ${ errores['minlength'].requiredLength } caracteres.`;
        }
      }

      return null;
    }

    onSave():void {

      if(this.myForm.invalid) {
        this.myForm.markAllAsTouched(); 
        return;
      }

      console.log(this.myForm.value);

      this.myForm.reset({
        price: 0,
        inStorage: 0,
      });
    }
}
