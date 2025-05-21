import { FormControl, Validators } from "@angular/forms";

export const CONTROLLER_DEFAULT_FORM_CONFIG = {
    orderId: [null, Validators.required],
    isDocumentsCorrect: [false],
    isNoViolations: [false]
}