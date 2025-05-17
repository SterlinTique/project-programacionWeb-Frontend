import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UsersService } from 'app/services/users/users.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-create-user',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule
  ],
  templateUrl: './modal-create-user.component.html',
  styleUrl: './modal-create-user.component.scss'
})
export class ModalCreateUserComponent implements OnInit {

  formCreateUser!: FormGroup; // Aquí se guarda el formulario para crear usuarios
  administratorsValues: any[] = []; // Aquí se guarda la lista de administradores disponibles
  showFieldAdministrator: boolean = false; // Controla si se muestra el campo de administrador

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Recibe datos al abrir el modal
    private readonly _formBuilder: FormBuilder, // Ayuda a crear el formulario
    private readonly _userService: UsersService, // Servicio para trabajar con usuarios
    private readonly dialogRef: MatDialogRef<ModalCreateUserComponent>, // Referencia al modal para poder cerrarlo
    private readonly _sanckBar: MatSnackBar, // Para mostrar mensajes en pantalla
  )

  {
    this.createFormUsers(); // Se crea el formulario al iniciar el componente

    // Se revisa si la contraseña de confirmación cambia, para validar que coincida con la original
    this.formCreateUser.controls['confirmPassword'].valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((value) => {
      this.validatePassword(value);
    });
  }

  ngOnInit(): void {
    this.getAllAdministrator(); // Al iniciar, se pide la lista de administradores
  }
  
  createFormUsers() {
    // Se definen los campos del formulario y cuáles son obligatorios
    this.formCreateUser = this._formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      rol_id: ['', Validators.required],
      administrador_id: [undefined, Validators.required]
    });
  }

  getAllAdministrator() {
    // Se pide la lista de administradores al backend
    this._userService.getAllAdministrator().subscribe({
      next: (res) => {
        this.administratorsValues = res.users; // Se guarda la lista recibida
      },
      error: (err) => {
        console.error(err); // Si hay error, se muestra en consola
      }
    });
  }

  onChangeRole(event: any) {
    // Si el rol seleccionado es "1" (Administrador), se oculta el campo de administrador
    if (event.value === '1') {
      this.hideAdministratorField();
    } else {
      // Si es otro rol, se muestra el campo de administrador
      this.showAdministratorField();
    }
  }

  onSubmit() {
    // Si el formulario no está completo, se muestra un mensaje de error
    if (this.formCreateUser.invalid) {
      Swal.fire('Error', 'Por favor completa los campos', 'error');
      return;
    }
    
    const superAdminId = 1; // Id fijo para el super administrador
    // Se preparan los datos para enviar al backend
    const userDataInformation = {
      nombre: this.formCreateUser.get('nombre')?.value,
      email: this.formCreateUser.get('email')?.value,
      password: this.formCreateUser.get('password')?.value,
      rol_id: Number(this.formCreateUser.get('rol_id')?.value),
      // Si el rol es administrador, se asigna el super admin como su relación
      administrador_id: this.formCreateUser.get('rol_id')?.value === '1' ? superAdminId : this.formCreateUser.get('administrador_id')?.value
    };

    console.log(userDataInformation); // Se muestra en consola para revisar los datos
    this._userService.createUser(userDataInformation).subscribe({
      next: (response) => {
        // Si todo sale bien, se muestra un mensaje, se limpia el formulario y se cierra el modal
        this._sanckBar.open(response.message, 'Cerrar', { duration: 5000 });
        this.formCreateUser.reset();
        this.dialogRef.close(true);
      },
      error: (error) => {
        // Si hay error, se muestra un mensaje de error
        const errorMessage = error.error?.result || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
        this._sanckBar.open(errorMessage, 'Cerrar', { duration: 5000 });
      }
    });
  }

  private validatePassword(confirmPassword: string) { // Verifica que la contraseña de confirmación coincida con la original
    const password = this.formCreateUser.get('password')?.value;
    if (password !== confirmPassword) {
      this.formCreateUser.get('confirmPassword')?.setErrors({ invalid: true });
    } else {
      this.formCreateUser.get('confirmPassword')?.setErrors(null);
    }

  }
  
  private showAdministratorField() { // Muestra el campo de administrador cuando corresponde
    this.showFieldAdministrator = true;
    this.formCreateUser.get('administrador_id')?.setValidators([Validators.required]);
    this.formCreateUser.get('administrador_id')?.updateValueAndValidity();
  }

  private hideAdministratorField() { // Oculta el campo de administrador cuando corresponde
    this.showFieldAdministrator = false;
    this.formCreateUser.get('administrador_id')?.clearValidators();
    this.formCreateUser.get('administrador_id')?.updateValueAndValidity();
  }

}
