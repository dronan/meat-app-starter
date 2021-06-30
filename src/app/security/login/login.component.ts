import { NotificationService } from './../../shared/messages/notification.service';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  navigateTo: string;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() { 
    this.loginForm = this.fb.group({
      email: this.fb.control('', [ Validators.required, Validators.email ]),
      password: this.fb.control('', [ Validators.required ])
    })
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || '/';
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
                        },
                        () => {
                          this.router.navigate([this.navigateTo])
                        })
  }
}
