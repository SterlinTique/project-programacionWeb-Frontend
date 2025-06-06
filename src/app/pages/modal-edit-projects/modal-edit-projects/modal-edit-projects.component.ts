
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
  selector: 'app-modal-edit-projects',
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
  templateUrl: './modal-edit-projects.component.html',
  styleUrl: './modal-edit-projects.component.scss'
})
export class ModalEditProjectsComponent implements OnInit {

  formEditProject!: FormGroup;
  administratorsValues: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _formBuilder: FormBuilder,
    private readonly _projectService: ProjectsService,
    private readonly _userService: UsersService,
    private readonly dialogRef: MatDialogRef<ModalEditProjectsComponent>,
    private readonly _snackBar: MatSnackBar
  ) {
    this.createFormProject();
  }

  ngOnInit(): void {
    this.getAllAdministrator();
    this.loadProjectData(this.data.project);
  }

  createFormProject() {
    this.formEditProject = this._formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      administrador_id: ['', Validators.required]
    });
  }

  getAllAdministrator() {
    this._userService.getAllAdministrator().subscribe({
      next: (res) => {
        this.administratorsValues = res.users;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  loadProjectData(project: any) {
    this.formEditProject.patchValue({
      nombre: project.nombre,
      descripcion: project.descripcion,
      administrador_id: project.administrador_id
    });
  }

  onUpdate() {
    if (this.formEditProject.invalid) {
      Swal.fire('Error', 'Por favor completa los campos', 'error');
      return;
    }

    const projectData = {
      nombre: this.formEditProject.get('nombre')?.value,
      descripcion: this.formEditProject.get('descripcion')?.value,
      administrador_id: this.formEditProject.get('administrador_id')?.value
    };

    this._projectService.updateProject(this.data.project.id, projectData).subscribe({
      next: (response) => {
        this._snackBar.open(response.message, 'Cerrar', { duration: 5000 });
        this.dialogRef.close(true);
      },
      error: (error) => {
        const errorMessage = error.error?.message || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
        this._snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
      }
    });
  }

}