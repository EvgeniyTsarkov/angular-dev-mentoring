import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Author } from 'src/app/core/models/Author';
import { DbAuthor } from 'src/app/core/models/DbAuthor';
import { AuthorsService } from 'src/app/core/services/authorsService';

@Component({
  selector: 'app-add-authors',
  templateUrl: './add-authors.component.html',
  styleUrls: ['./add-authors.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AddAuthorsComponent),
    multi: true
  }]
})
export class AddAuthorsComponent implements ControlValueAccessor {
  @Input()
  public savedAuthors!: Author[];

  public authorsControl = new FormControl();

  public allAuthors$!: Observable<DbAuthor[]>;

  public constructor(private readonly authorsService: AuthorsService) {
    this.allAuthors$ = authorsService.getAll();
  }

  public onChange(_: any) { }
  public onTouched(_: any) { }

  public writeValue(value: any): void {
    this.savedAuthors = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public deleteAuthor(authorId: number) {
    const authorTagToDelete = this.savedAuthors.find(item => item.id === authorId) as Author;
    const index = this.savedAuthors.indexOf(authorTagToDelete);
    this.savedAuthors.splice(index, 1);
    this.onChange(this.savedAuthors);
  }

  public selectAuthor(name: string) {
    const [firstName, lastName] = name.split(' ');
    const newAuthor: Author = {
      //The authors in /courses api differ from authors in /authors api in entities and field types.
      //This is just a walkaround.
      id: 1567 + Math.random() * (10_000 - 500) + 500,
      name: firstName,
      lastName
    };

    this.addNewAuthor(name, newAuthor);
  }

  private addNewAuthor(name: string, newAuthor: Author) {
    this.allAuthors$.subscribe(items => {
      const names = items.map(item => item.name);
      if (names.includes(name)) {
        this.savedAuthors.push(newAuthor);
        this.onChange(this.savedAuthors);
      }
    });
  }
}
