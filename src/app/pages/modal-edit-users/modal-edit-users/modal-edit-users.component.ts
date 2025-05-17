import { CommonModule } from '@angular/common';
// Importamos las herramientas necesarias de Angular y pa el Angular Material
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogActions, MatDialogClose, MatDialogTitle,  MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'app/services/users/users.service';

// Aquí definimos el componente que representa el modal para editar usuarios
@Component({
  selector: 'app-modal-edit-users', // Nombre para usar el componente en HTML
  standalone: true, // Permite que este componente se use por sí solo
  imports: [
    // Importamos los módulos que vamos a usar en el modal
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
    ReactiveFormsModule
  ],
  templateUrl: './modal-edit-users.component.html', // Archivo HTML del modal
  styleUrl: './modal-edit-users.component.scss' // Archivo de estilos del modal
})
export class ModalEditUsersComponent {

  formUpdateUsers!: FormGroup; // Aquí guardamos el formulario para editar usuarios
  administratorsValues: any[] = []; // Aquí guardamos la lista de administradores

  // El constructor recibe varias herramientas y servicios que vamos a usar
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Recibimos los datos que se pasan al abrir el modal
    private readonly _formBuilder: FormBuilder, // Nos ayuda a crear el formulario
    private readonly _snackBar: MatSnackBar, // Para mostrar mensajes en pantalla
    private readonly _userService: UsersService, // Servicio para trabajar con usuarios
    private readonly dialogRef: MatDialogRef<ModalEditUsersComponent> // Referencia al modal para poder cerrarlo
  ) {
    this.updateFormUsers(); // Inicializamos el formulario
    this.getAllAdministrator(); // Cargamos la lista de administradores
  }

  // Cuando el componente se inicia, si hay datos de usuario, los cargamos en el formulario
  ngOnInit() {
    if (this.data?.user) {
      this.loadUserData(this.data.user);
    }
  }

  // Creamos el formulario con los campos y las reglas que deben cumplir
  updateFormUsers() {
    this.formUpdateUsers = this._formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol_id: ['', Validators.required],
      administrador_id: ['', Validators.required]
    });
  }

  // Si ya hay datos de usuario, los ponemos en el formulario para que se puedan editar
  loadUserData(user: any) {
    this.formUpdateUsers.patchValue({
      nombre: user.nombre,
      email: user.email,
      rol_id: String(user.rol_id),
      administrador_id: user.administrador_id,
    });
  }

  // Pedimos al backend la lista de administradores para mostrarla en el formulario
  getAllAdministrator() {
    this._userService.getAllAdministrator().subscribe({
      next: (res) => {
        this.administratorsValues = res.users; // Guardamos la lista recibida
      },
      error: (err) => {
        console.error(err); // Si hay error, lo mostramos en consola
      }
    });
  }

  // Cuando el usuario hace clic en guardar, enviamos los datos al backend para actualizar el usuario
  updateUsers() {
    if (this.formUpdateUsers.valid) { // Solo si el formulario está bien llenado
      const userData = this.formUpdateUsers.value; // Tomamos los datos del formulario
      const userId = this.data?.user?.id; // Tomamos el id del usuario a editar

      this._userService.updateUser(userId, userData).subscribe({
        next: (response) => {
          // Si todo sale bien, mostramos un mensaje y cerramos el modal
          this._snackBar.open(response.message, 'Cerrar', { duration: 5000 });
          this.dialogRef.close(true);
        },
        error: (error) => {
          // Si hay error, mostramos un mensaje de error
          const errorMessage = error.error?.result || 'Ocurrió un error inesperado. Por favor, intente nuevamente';
          this._snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
        }
      });
    }
  }

}
