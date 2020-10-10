import { TaskService } from './task-service.service';
import { Injectable } from '@angular/core';

import { Task } from './../models/Task';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private taskService: TaskService) { }

  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  saveTask(task: Task) {
    return this.taskService.saveTask(task);
  }

  delete(id: number) {
    return this.taskService.deleteTask(id);
  }
}
