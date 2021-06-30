import { NotificationService } from './../../shared/messages/notification.service';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private notificationService: NotificationService) { }

  ngOnInit() { 
    this.loginForm = this.fb.group({
      email: this.fb.control('', [ Validators.required, Validators.email ]),
      password: this.fb.control('', [ Validators.required ])
    })
  }

  login() {
    this.loginService.login(this.loginForm.value.email,
                            this.loginForm.value.password)
                      .subscribe( 
                        success => { 
                          this.notificationService.notify(`Bem vindo, ${success.name}`)
                        },
                        error => { 
                          this.notificationService.notify(`${error.error.message}`)
                        })
  }
}
