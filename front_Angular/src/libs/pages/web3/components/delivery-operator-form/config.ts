import { Validators } from "@angular/forms";

export const DELIVETY_OPERATOR_FORM_DEFAULT_CONFIG = {
    resourceId: ['', Validators.required],
    resourceTitle: ['', Validators.required],
    resourceWeight: [null, Validators.required],
    resourcePrice: [null, Validators.required]
}