export interface User {
    id?: number;
    name: {
        first: string;
        last: string;
    };
    login: string;
    password: string;
    fakeToken?: string;
}
