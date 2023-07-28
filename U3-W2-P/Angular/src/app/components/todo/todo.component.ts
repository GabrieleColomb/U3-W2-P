import { Component } from '@angular/core';
import { Todo } from 'src/app/todo';
import { TodosService } from 'src/app/todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  todos: Todo[] = [];

  constructor(private todosSrv: TodosService)
  {}
  ngOnInit() {
    this.todosSrv.getAll().then((todos) => {
      this.todos = todos.filter((el) => el.completed == false);
    });
  }
  eliminaTodo(todo: Todo) {
    this.todosSrv.delete(todo).then(() => {
      this.todos = this.todos.filter((p) => p.id != todo.id);
    });
  }

}
