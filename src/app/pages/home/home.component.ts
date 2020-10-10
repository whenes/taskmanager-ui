import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

import { HomeService } from './../../services/home.service';
import { Task } from './../../models/Task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todo: Task[];
  done: Task[];

  constructor(private homeService: HomeService,
              private router: Router) { }

  ngOnInit() {
    this.homeService.getAllTasks().subscribe(responseTasks => {
      this.todo = responseTasks.filter(function(task) { return task.status === 'TODO'; });
      this.done = responseTasks.filter(function(task) { return task.status === 'DONE'; });
    });
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      let task = this.convertToTask(event.container.data[event.currentIndex]);
      this.saveTaskOnDropList(task);
    }
  }

  convertToTask(itemToConvert: any) {
    let task: Task= {id: null, title: "", description: "", status: "TODO"};
    task.id = itemToConvert.id;
    task.title = itemToConvert.title;
    task.description = itemToConvert.description;
    task.status = itemToConvert.status;
    return task;
  }

  saveTaskOnDropList(task: Task) {
    this.updateToNewStatus(task);
    this.homeService.saveTask(task).subscribe(responseTask => {});
  }

  update(item: any) {
    this.router.navigate(["/task/save", item]);
  }

  delete(id: number) {
    this.homeService.delete(id).subscribe();
    setTimeout(function() {
      document.location.reload(true)
    },2000);
  }

  updateToNewStatus(task: Task) {
    if (task.status === 'TODO') {
      task.status = 'DONE';
      return task;
    }
    task.status = 'TODO';
    return task;
  }
}
