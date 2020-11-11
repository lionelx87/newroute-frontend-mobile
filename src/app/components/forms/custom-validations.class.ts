import { FormGroup } from '@angular/forms';

export class CustomValidations {

    constructor() { }

    static matchPassword(password: string, confirmPassword: string) {

        return (formGroup: FormGroup) => {
            const passwordControl = formGroup.controls[password];
            const confirmPasswordControl = formGroup.controls[confirmPassword];

            if(!passwordControl || !confirmPassword) { return null; }

            if(confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) { return null; }

            if(passwordControl.value !== confirmPasswordControl.value) {
                confirmPasswordControl.setErrors({ passwordMismatch: true });
            }else {
                confirmPasswordControl.setErrors(null);
            }
        };
    }
}