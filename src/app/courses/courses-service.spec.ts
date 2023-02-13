import { Course } from '../core/models/Course';
import { CoursesService } from './courses-service';

describe('CoursesService', () => {
    let coursesService: CoursesService;

    const testTitleAndDescription = 'Test course';

    beforeEach(() => {
        coursesService = new CoursesService();
    });

    it('courses-service should return the collection of courses with getAll()', () => {
        const courses = coursesService.getAll();

        expect(courses.length).toBe(10);
    });

    it('courses-service should create a course with create() and delete course with delete()', () => {
        const expectedCourseId = 55;

        const expectedCourseItem: Course = {
            id: expectedCourseId,
            name: testTitleAndDescription,
            description: testTitleAndDescription,
            date: new Date('11/5/2022'),
            length: 88,
        };

        coursesService.create(expectedCourseItem);

        const courses = coursesService.getAll();

        expect(courses).toContain(expectedCourseItem);

        coursesService.delete(expectedCourseId);
    });

    it('courses-service should return a course by id with getById()', () => {
        const expectedCourse: Course = {
            id: 6,
            name: 'Android Performance',
            date: new Date('11/10/2022'),
            length: 174,
            description: 'If you’ve ever hit performance issues that affect your app’s usability, ' +
                'this course will teach you how to identify and diagnose your performance problems. ' +
                'By the end of this course, you’ll be able to perform exploratory tests, ' +
                'run profiling tools, use outputs to navigate to problematic code, and design a plan of ' +
                'attack to mitigate poor performance.',
            isTopRated: false
        };

        const actualCourse = coursesService.getById(6);

        expect(actualCourse).toEqual(expectedCourse);
    });

    it('courses-service should update course with update()', () => {
        const expectedCourse: Course = {
            id: 7,
            name: testTitleAndDescription,
            description: testTitleAndDescription,
            date: new Date('11/6/2011'),
            length: 88
        };

        coursesService.update(expectedCourse);

        const updatedCourse = coursesService.getById(7);

        expect(updatedCourse).toEqual(expectedCourse);
    });
});
