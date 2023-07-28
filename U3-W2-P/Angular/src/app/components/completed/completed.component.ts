import { Component } from '@angular/core';
import { Todo } from 'src/app/todo';
import { TodosService } from 'src/app/todos.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent {

  todos: Todo[] = [];

  constructor(private todosSrv: TodosService)
  {}
  ngOnInit() {
    this.todosSrv.getAll().then((todos) => {
      this.todos = todos.filter((el) => el.completed == true);
    });
  }
  eliminaTodo(todo: Todo) {
    this.todosSrv.delete(todo).then(() => {
      this.todos = this.todos.filter((p) => p.id != todo.id);
    });
  }

}
