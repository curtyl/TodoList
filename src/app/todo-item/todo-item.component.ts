import { TodoItemData } from '../dataTypes/TodoItemData';
import { TodoService } from '../todo.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})

export class TodoItemComponent implements OnInit {
  
  @Input() 
  private item: TodoItemData;

  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  get label(): string {
    return this.item.label;
  }

  get Done(): boolean {
    return this.item.Done;
  }

  itemDone(item: TodoItemData, done: boolean) {
    this.todoService.setItemsDone(done, item);
  }

  itemDelete() {
    this.todoService.deleteItems(this.item);
  }
  
}