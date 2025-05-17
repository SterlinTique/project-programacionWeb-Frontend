export class User {
    id!: number;
    username!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    token!: string;
}

// El ! es tomado como un not null, o sea, estas propiedades deben tener un valor si o si