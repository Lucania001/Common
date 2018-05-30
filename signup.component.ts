import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "./auth.service";
import { User } from "./user.model";
import { popupModal, NgbdModalComponent } from "../modal/modal-popup";




@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    providers: [popupModal, NgbdModalComponent],
})
export class SignupComponent implements OnInit {
    myForm: FormGroup;

    constructor(private authService: AuthService,  private modal: NgbdModalComponent) {}

    onSubmit() {
        //console.log(this.myForm.value.consent)
        console.log(this.myForm.get('consent').value)

        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName,
            this.myForm.get('consent').value
        );
        this.authService.signup(user)
            .subscribe(
                data => {
                    console.log(data)
                    this.modal.open(
                        "Success",
                       "Account Created, you can now log-in"
                    )
                   
                },
                error => {
                    console.error(error)
                    this.modal.open(
                        "Error",
                        error.error.message
                    )

                }
            );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ]
            ),
            consent: new FormControl(null)
        });
    }
}
