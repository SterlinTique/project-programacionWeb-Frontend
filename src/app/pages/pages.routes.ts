import { Route } from "@angular/router";
import { UsersComponent } from "./users/users/users.component";
import { ProjectsComponent } from "./projects/projects.component";
// import { ProjectDetailComponent } from "./projects-detail/project-detail.component";
import { AdminGuard } from "@core/guard/admin.guard";

export const PAGES_ROUTE: Route[] = [
    {
        path: "users", // Ruta para la página de usuarios
        component: UsersComponent,  // Componente que renderiza la ruta
        canActivate: [AdminGuard]  // Guardia que protege la ruta
    },
    {
        path: "projects", // Ruta para la página de proyectos
        component: ProjectsComponent,
    },
]