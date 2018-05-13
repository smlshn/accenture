export class User {
    id: number;
    email: string;
    password: string;
    nameSurname: string;
    authorities: Authority[];
}

export class Authority{
    name: string
}


