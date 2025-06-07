import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; 
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'app/services/projects/projects.service';
import { UsersService } from 'app/services/users/users.service';
import { AuthService } from '@core';
import { Router } from '@angular/router';
import { ModalAssignUsersComponent } from 'app/pages/modal-assign-users/modal-assign-users/modal-assign-users.component';


@Component({
  selector: 'app-modal-view-project',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    BreadcrumbComponent,
  ],
  templateUrl: './modal-view-project.component.html',
  styleUrls: ['./modal-view-project.component.scss']
})
export class ModalViewProjectComponent implements OnInit {

  
  breadscrums = [
    {
      title: 'Gestión de proyectos',
      item: ['Datos basicos'],
      active: 'Detalles del proyecto',
    },
  ];

  breadscrumsDetails = [
    { 
      title: '',
    },
  ];

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  projectId: number | null = null; // Inicializa projectId como null
  project: any = {}; // Inicializa project como un objeto vacío
  usersList = new MatTableDataSource<any>([]);

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private authService: AuthService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) { }

  userRole: any; // Variable con el rol_id almacenado para utilizarlo en el html

  ngOnInit(): void {
    const userInfo = this.authService.getAuthFromSessionStorage(); // Para sacar la info del usuario logueado
    this.userRole = userInfo.rol_id; // sacamos el rol del usuario logueado
    console.log('userRole:', this.userRole);
  this.projectId = Number(this.route.snapshot.paramMap.get('id'));
  if (this.projectId) {
    this.projectId = Number(this.projectId);
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        const foundProject = projects.projects.find((p: any) => p.id === this.projectId);
        if (foundProject) {
          this.project = foundProject;
          this.usersList.data = foundProject.usuarios || [];
          this.usersList.paginator = this.paginator; // Vinculación del paginador
        } else {
          this.usersList.data = [];
        }
      },
      error: (err) => {
        this.usersList.data = [];
      }
    });
  }
}

  openAssignUsersModal(): void {
    this.dialog.open(ModalAssignUsersComponent, {
        width: '500px',
        data: { projectId: this.project.id }
    }).afterClosed().subscribe((result) => {
        if (result) {
          // Refresca usando getAllProjects
          this.projectService.getAllProjects().subscribe({
            next: (projects) => {
              const foundProject = projects.projects.find((p: any) => p.id === this.projectId);
              if (foundProject) {
                this.project = foundProject;
                this.usersList.data = foundProject.usuarios || [];
              } else {
                this.usersList.data = [];
              }
              this.cdr.detectChanges();
            }
          });
        }
    });
  }

removeUserFromProject(userId: number): void {
  if (this.projectId !== null) {
    const data = { projectId: this.projectId, userId: userId };
    this.projectService.removeUserFromProject(data).subscribe({
      next: () => {
        // Refresca usando getAllProjects
        this.projectService.getAllProjects().subscribe({
          next: (projects) => {
            const foundProject = projects.projects.find((p: any) => p.id === this.projectId);
            if (foundProject) {
              this.project = foundProject;
              this.usersList.data = foundProject.usuarios || [];
            } else {
              this.usersList.data = [];
            }
            this.cdr.detectChanges();
          }
        });
      },
      error: (err) => {
        console.error('Error al desasociar usuario:', err);
      }
    });
  }
}
  /*getProjectById() {
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (res) => {
        this.project = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  } 
  getUsersByProject() {
    this.projectService.getUsersByProject(this.projectId).subscribe({
      next: (res) => {
        this.usersList = res.users;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }   */

  volver(): void {
    this.router.navigate(['/page/projects']); // reemplazar '/ruta-anterior' con la ruta real
  }
}
