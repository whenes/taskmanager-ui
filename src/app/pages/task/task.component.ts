import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { TaskService } from './../../services/task-service.service';
import { Task } from './../../models/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task: Task;

  constructor(private service: TaskService,
              private router: Router,
              private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activedRoute.params.subscribe(param => {
      if (this.paramIsValid(param)) {
        this.task = this.convertParamToTask(param);
      } else {
        this.task = {id: null, title: "", description: "", status: "TODO"};
      }
    });
  }

  paramIsValid(param) {
    if (param.id === null) {
      return false;
    }
    if (param.title === "") {
      return false;
    }
    if (param.description === "") {
      return false;
    }
    if (param.status === "") {
      return false;
    }
    return true;
  }

  convertParamToTask(param) {
    let task: Task = {id: null, title: "", description: "", status: "TODO"};
    task.id = param.id;
    task.title = param.title;
    task.description = param.description;
    task.status = param.status;
    return task;
  }

  cancel() {
    this.router.navigate([""]);
  }

  saveOrUpdate() {
    if (this.task.id) {
      this.update();
    } else {
      this.save();
    }
  }

  save() {
    if (this.isValidTask(this.task)) {
      this.service.saveTask(this.task).subscribe(responseNewTask => {
        console.log(responseNewTask);
        this.router.navigate([""]);
      });
    }
  }

  update() {
    if (this.isValidTask(this.task)) {
      this.service.updateTask(this.task).subscribe(responseNewTask => {
        console.log(responseNewTask);
        this.router.navigate([""]);
      });
    }
  }

  isValidTask(task: Task) {
    if (task.title === "") {
      return false;
    }
    if (task.description === "") {
      return false;
    }
    if (task.status === "") {
      return false;
    }
    return true;
  }

}
