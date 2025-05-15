import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-editar-usuario',
  imports: [HeaderComponent,FooterComponent,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent {
  formulario: FormGroup;
  userName: String = '';
  emailForm: FormGroup;
  phoneForm: FormGroup;
 
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.formulario = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: [this.passwordsIgualesValidator]
    });

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailRegex)]]
    });

    const telefonoRegex = /^(?:\+34|0034)?\s?(6\d{2}|7\d{2}|8\d{2}|9\d{2})\s?\d{3}\s?\d{3}$/;
    this.phoneForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(telefonoRegex)]]
    })    
  }

  ngOnInit(): void {
    this.getUserName();
    console.log(this.userName);
  }

  getUserName(){
    this.userService.getUserName().subscribe(
      (data) => {
      this.userName = data;
    },
    (error) => {
      console.error('Error al obtener el nombre de usuario', error);
    })
  }


  passwordsIgualesValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordsNoCoinciden: true };
  }

  cambiarContrasenia(){

  }

  editarEmail(){

  }

  editarTelefono(){

  }



}
