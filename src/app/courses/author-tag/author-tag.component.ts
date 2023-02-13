import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Author } from 'src/app/core/models/Author';

@Component({
  selector: 'app-author-tag',
  templateUrl: './author-tag.component.html',
  styleUrls: ['./author-tag.component.css']
})
export class AuthorTagComponent {
  @Input()
  public author!: Author;

  @Output()
  public deleteClicked = new EventEmitter<number>();

  public onDeleteButtonClick(): void {
    const authorId = this.author.id;
    this.deleteClicked.emit(authorId);
  }
}
