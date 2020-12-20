import { Injectable } from '@angular/core';
import {TodoListData} from './dataTypes/TodoListData';
import {Observable, BehaviorSubject} from 'rxjs';
import {TodoItemData} from './dataTypes/TodoItemData';

@Injectable()
export class TodoService {

  private todoListSubject = new BehaviorSubject<TodoListData>({
    label: 'TodoList',
    items: localStorage.getItem('items') == null ? [] : JSON.parse(localStorage.getItem('items'))
  });

  constructor(){}

  getTodoListDataObservable(): Observable<TodoListData> {
    return this.todoListSubject.asObservable();
  }

  setItemsLabel(label: string, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next({
      label: tdl.label,
      items: tdl.items.map(Item => items.indexOf(Item) === -1 ? Item : ({label, Done: Item.Done, Show: Item.Show}) )
    });
    localStorage.setItem('items', JSON.stringify(this.todoListSubject.getValue().items));
  }

  setItemsDone(Done: boolean, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( Item => items.indexOf(Item) === -1 ? Item : ({label: Item.label, Done, Show: Item.Show}) )
    });
    localStorage.setItem('items', JSON.stringify(this.todoListSubject.getValue().items));
  }

  appendItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: [...tdl.items, ...items]
    });
    localStorage.setItem('items', JSON.stringify(this.todoListSubject.getValue().items));
  }

  deleteItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.filter( Item => items.indexOf(Item) === -1 )
    });
    localStorage.setItem('items', JSON.stringify(this.todoListSubject.getValue().items));
  }

  deleteItemsDone() {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.filter( Item => Item.Done === false)
    });
    localStorage.setItem('items', JSON.stringify(this.todoListSubject.getValue().items));
  }

}