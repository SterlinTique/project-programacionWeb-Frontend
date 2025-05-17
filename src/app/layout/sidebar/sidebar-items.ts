
import { ROLES } from '@core/models/enums';
import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard/main',   // Ruta del modulo
    title: 'Inicio', // Título
    iconType: 'material-icons-outlined', // Tipo y nombre del icono
    icon: 'home',
    class: '', // Clase CSS del modulo, en este caso vacio
    groupTitle: false, // Indica si es un título de grupo
    badge: '',
    badgeClass: '',
    submenu: [], // Arreglo por si nesecita de un submenú
    rolAuthority: [ROLES.ADMIN, ROLES.USER] // Roles que tienen acceso
  },
  {
    path: '/page/projects',
    title: 'Gestión de proyectos',
    iconType: 'material-icons-outlined',
    icon: 'assessment',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    rolAuthority: [ROLES.ADMIN] // Solo administradores tienen acceso
  },  
  {
    path: '/page/users',
    title: 'Gestión de usuarios',
    iconType: 'material-icons-outlined',
    icon: 'assessment',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    rolAuthority: [ROLES.ADMIN] // Solo administradores tienen acceso
  },
  {
    path: '/page/projects',
    title: 'Mis proyectos',
    iconType: 'material-icons-outlined',
    icon: 'assessment',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    rolAuthority: [ROLES.USER] // Usuarios tienen acceso
  },  

  {// Modulo para que un super Admin pueda gestionar de forma general
    path: '/page/super-admin',
    title: 'Super Admin',
    iconType: 'material-icons-outlined',
    icon: 'assessment',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    rolAuthority: [ROLES.ADMIN], // Rol de administrador
  }
];
