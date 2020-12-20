import {Component, OnInit} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
 
})
export class TodoListComponent implements OnInit {

    private todoList: TodoListData;
    
    constructor(private todoService: TodoService){
        todoService.getTodoListDataObservable().subscribe( tdl => this.todoList = tdl );
    }

    ngOnInit(){}
 
    get label(): string {
        return this.todoList.label;
    }
    
    get items(): TodoItemData[] {
        return this.todoList.items;
    }

    appendItem(label: string, Done: boolean = false, fromLocalStorage: boolean = false){
        if(label.length > 0){
            this.todoService.appendItems({
                label,
                Done:Done,
                Show: true
            });
        }        
    }
    
    Suppr(){
        this.todoService.deleteItemsDone();
    }

    actives(){
       this.todoList.items.forEach(Item => {
            if(Item.Done==true){
                Item.Show=false;
            }else{
                Item.Show=true;
            }
        });
    }

    toutes(){
        this.todoList.items.forEach(Item =>Item.Show=true);
    }

    completees(){
        this.todoList.items.forEach(Item => {
            if(Item.Done==true){
                Item.Show=true;
            }else{
                Item.Show=false;
            }
        });     
    }
 
    nbRestantes(){
        return this.todoList.items.length - this.todoList.items.filter(Item =>Item.Done==true).length;
    }
 
    toggleAll(){
        var checkSelected = true;
        this.todoList.items.forEach(Item => {
            if(Item.Done==false){
                checkSelected = false;
            }
        });
        this.todoList.items.forEach(Item => {
            if(checkSelected == false){
                this.todoService.setItemsDone(Item.Done = true);
            }else{
                this.todoService.setItemsDone(Item.Done = false);
            }
        });
    }
 
    toutSuppr(){
        this.todoList.items.forEach(Item =>this.todoService.deleteItems(Item));
    }
}