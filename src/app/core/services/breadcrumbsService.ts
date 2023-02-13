import { Injectable } from '@angular/core';
import { Breadcrumb } from '../models/Breadcrumb';

@Injectable()
export class BreadcrumbsService {
    private breadcrumb: Breadcrumb = {
        courseText: '',
        url: '',
        urlText: ''
    };

    public setBreadcrumb(breadcrumbAssembly: Breadcrumb): void {
        this.breadcrumb = {
            courseText: breadcrumbAssembly.courseText,
            url: breadcrumbAssembly.url,
            urlText: breadcrumbAssembly.urlText
        };
    }

    public getBreadcrumb() {
        return this.breadcrumb;
    }
}
