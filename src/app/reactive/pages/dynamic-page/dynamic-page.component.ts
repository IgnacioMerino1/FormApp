import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  //public myForm2 = new FormGroup({
  //  favoriteGames: new FormArray([])
  //});

  public myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required ],
      ['Dead', Validators.required ],
    ])
  });

  public newFavorite: FormControl = new FormControl('',[Validators.required]);

  constructor( private fb: FormBuilder) {}

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField( campo: string ):boolean|null {

    return this.myForm.controls[campo].errors
      && this.myForm.controls[campo].touched;
  }

  isValidFieldInArray( formArray: FormArray, index: number ):boolean|null {

    return formArray.controls[index].errors
      && formArray.controls[index].touched;
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

  onAddToFavorite():void {
    if(this.newFavorite.invalid) return;

    //this.favoriteGames.push( new FormControl( this.newFavorite.value, Validators.required) );
    this.favoriteGames.push(
      this.fb.control( this.newFavorite.value, Validators.required) 
    );
    this.newFavorite.reset();

  }

  onDeleteFavorite(index: number):void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit():void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched;
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }
}
