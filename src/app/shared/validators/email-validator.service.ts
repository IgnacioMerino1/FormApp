import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, map, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator{

    /*
    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const email = control.value;

        return of({
            emailTaken: true
        })
    }
    */
   
    /*
    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const email = control.value;
        console.log(email);

        return this.http.get<string>(`https://host:3000/users${email}`)
            .pipe(
                map (resp => {
                    return (resp.length ===0 )
                        ? null
                        : {emailTaken : true} 
                })
            );
    }
    */

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const email = control.value;
        const httpCallObservable = new Observable<ValidationErrors | null> ( (subscriber ) => {
            console.log({email});

            if(email === 'yo@aqui.es') {
                subscriber.next({emailTaken:true});
                subscriber.complete();
                //return;   // Opcional ya que no emite mas valores
            }

            subscriber.next(null);
            subscriber.complete;
        }).pipe(
            delay(2000)
        )

        return httpCallObservable;
    }

}