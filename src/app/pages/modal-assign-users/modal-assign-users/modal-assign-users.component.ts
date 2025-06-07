import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'app/services/users/users.service';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProjectsService } from 'app/services/projects/projects.service';
import { User } from 'app/pages/users/users/users.component';

@Component({
  selector: 'app-modal-assing-users',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatDialogModule, 
    MatInputModule, FormsModule, MatSelectModule, MatOptionModule, 
    MatIconModule, MatListModule, MatCardModule, MatTooltipModule, 
    MatPaginatorModule, MatTableModule, MatPseudoCheckboxModule,
    MatCheckboxModule
  ],
  templateUrl: './modal-assign-users.component.html',
  styleUrl: './modal-assign-users.component.scss'
})
export class ModalAssignUsersComponent implements OnInit {
    usersList: any[] = [];
    filteredUsers: any[] = [];
    searchTerm = '';
    selectAll = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { projectId: number },
        private readonly dialogRef: MatDialogRef<ModalAssignUsersComponent>,
        private readonly projectService: ProjectsService,
        private readonly usersService: UsersService
    ) {}

    ngOnInit(): void {
        this.getUsers();
    }

getUsers(): void {
  this.usersService.getAllUsers().subscribe({
    next: (response) => {
      const users = Array.isArray(response) ? response : response.users || response.data || [];
      interface AssignableUser extends User {
        selected: boolean;
      }

      this.usersList = (users as User[]).map((user: User): AssignableUser => ({ ...user, selected: false }));
      this.filteredUsers = [...this.usersList];
    },
    error: (error) => {
      console.error('Error al obtener usuarios:', error);
    }
  });
}

    toggleAllUsers(selectAll: boolean): void {
      this.selectAll = selectAll;
      this.usersList.forEach(user => user.selected = selectAll);
    }

    assignSelectedUsers(): void {
        const selectedUsers = this.usersList.filter(user => user.selected);
        if (selectedUsers.length === 0) {
            return;
        }
        const userIds = selectedUsers.map(user => user.id);
        this.projectService.assingUsersToProject({
            projectId: this.data.projectId,
            userIds
        }).subscribe({
            next: () => {
                this.dialogRef.close(true);
            },
            error: (error) => {
                console.error('Error al asignar usuarios:', error);
            }
        });
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}