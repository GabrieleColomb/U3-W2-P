import { Injectable } from '@angular/core';
import { Todo } from './todo';

class TodoClass implements Todo
{
  id: number;
  title: string;
  completed: boolean;

  constructor(id:number, title:string, completed:boolean = false)
  {
    this.id = id
    this.title = title
    this.completed = completed
  }
}

@Injectable({
  providedIn: 'root'
})
export class TodosService
{
  readonly url:string =  "http://localhost:3000/data"
  public isLoaded:boolean

  constructor()
  {
    this.isLoaded = false
  }

  async getTasks():Promise<TodoClass[]>
  {
    this.isLoaded = false
    return await fetch(this.url, {method: "GET"})
      .then(response =>
        {
          return response.json()
        })
      .then(json =>
        {
          this.isLoaded = true
          return json
        })
  }

  async getTask(id:number):Promise<TodoClass>
  {
    return await fetch(`${this.url}/${id}`, {method: "GET"})
      .then(response =>
        {
          return response.json()
        })
      .then(json =>
        {
          return json
        })
  }

  async postTask(text:string):Promise<void>
  {
    let task:TodoClass = new TodoClass(0, text)
    await fetch(this.url,
          {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
          })
  }

  async putTask(id:number, newTitle:string, completed:boolean = false):Promise<void>
  {
      const taskUpdate = new TodoClass(id, newTitle, completed)
      await fetch(`${this.url}/${id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskUpdate)
      })
  }

  async deleteTask(id:number):Promise<void>
  {
      await fetch(`${this.url}/${id}`,
      {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
      })
  }

}

