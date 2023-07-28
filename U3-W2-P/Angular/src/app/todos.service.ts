import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos: Todo[] = [];
  private url: string = 'http://localhost:3000/todos';

  constructor() { }
  getAll():Promise<Todo[]>{
    return fetch(this.url).then(res => res.json());
  }
  getById(id:number):Promise<Todo>{
    return fetch(this.url+'?id='+id).then(res => res.json());
  }
  create(todo:Todo):Promise<Todo>{
    return fetch(this.url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    }).then(res => res.json());
  }
  update(todo:Todo):Promise<Todo>{
    return fetch(this.url+'/'+todo.id,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    }).then(res => res.json());
  }
  delete(todo:Todo){
    return fetch(this.url+'/'+todo.id,{
      method: 'DELETE'
    }).then(res => res.json());
  }
}
