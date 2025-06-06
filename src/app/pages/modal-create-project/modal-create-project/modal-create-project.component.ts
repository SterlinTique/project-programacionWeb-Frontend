import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UsersService } from 'app/services/users/users.service';
import { ProjectsService } from 'app/services/projects/projects.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-create-project',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule
  ],
  templateUrl: './modal-create-project.component.html',
  styleUrls: ['./modal-create-project.component.scss']
})
export class ModalCreateProjectComponent implements OnInit {

  formCreateProject!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _formBuilder: FormBuilder,
    private readonly _projectService: ProjectsService,
    private readonly _userService: UsersService, // Servicio para trabajar con usuarios
    private readonly dialogRef: MatDialogRef<ModalCreateProjectComponent>,
    private readonly _sanckBar: MatSnackBar
  ) {
    this.createFormProject();
  }

  administratorsValues: any[] = [];

  ngOnInit(): void {
    this.getAllAdministrator();
  }

  createFormProject() {
    this.formCreateProject = this._formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      administrador_id: ['', Validators.required]
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

  onSubmit() {
    if (this.formCreateProject.invalid) {
      Swal.fire('Error', 'Por favor completa los campos', 'error');
      return;
    }

    const projectData = {
      nombre: this.formCreateProject.get('nombre')?.value,
      descripcion: this.formCreateProject.get('descripcion')?.value,
      administrador_id: this.formCreateProject.get('administrador_id')?.value
    };

    this._projectService.createProject(projectData).subscribe({
      next: (response) => {
        this._sanckBar.open(response.message, 'Cerrar', { duration: 5000 });
        this.formCreateProject.reset();
        this.dialogRef.close(true);
      },
      error: (error) => {
        const errorMessage = error.error?.message || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
        this._sanckBar.open(errorMessage, 'Cerrar', { duration: 5000 });
      }
    });
  }

}