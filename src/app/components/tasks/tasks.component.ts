import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  

  tasks: Task[] = [];

  constructor(private tasService: TaskService) { }

  ngOnInit(): void {
    this.tasService.getTasks().subscribe((tasks) => {
      this.tasks = tasks
    }) 
  }

  deleteTask(task: Task){
    this.tasService.deleteTask(task).subscribe(() => (this.tasks = this.tasks.filter(t => t.id !== task.id)))
  }

  toggleReminder(task: Task){
    task.reminder =! task.reminder;
    this.tasService.updateTaskReminder(task).subscribe();
  }




  addTask(task: Task){
    this.tasService.addTask(task).subscribe((task) => {
      this.tasks.push(task)
    }) 
  }


}
