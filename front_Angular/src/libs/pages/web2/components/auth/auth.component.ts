import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { Card } from "primeng/card";
import { FloatLabel } from "primeng/floatlabel";
import { InputText, InputTextModule } from "primeng/inputtext";
import { SelectModule } from "primeng/select";
import { ToggleSwitchModule } from 'primeng/toggleswitch';

export const AUTH_FORM_DEFAULT_CONFIG = {
    email: [null, Validators.required],
    password: [null, Validators.required],
    name: [null],
    isRegister: [false, Validators.required],
}

@Component({
    selector: 'web2-auth',
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
    standalone: true,
    imports: [NgIf, ButtonModule, Card, FormsModule, ReactiveFormsModule, SelectModule, FloatLabel, InputTextModule, ToggleSwitchModule]
})
export class Web2AuthComponent {
    public authForm: FormGroup = this.fb.group(AUTH_FORM_DEFAULT_CONFIG);
    public isRegister = false;

    constructor(private fb: FormBuilder) {
        this.authForm.get('isRegister')?.valueChanges.subscribe(
            (isRegister) => {
                this.isRegister = isRegister;
            }
        );
    }

    public get btnText(): string {
        return this.isRegister ? 'Register' : 'Login';
    }

    public handleAuth(): void {
        console.log('Ауф ауф!')
    }
}