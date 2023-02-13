import { Author } from './Author';

export interface AddCourseModel {
    id: number;
    name: string;
    description: string;
    date: string;
    length: number;
    authors: Author[];
}
