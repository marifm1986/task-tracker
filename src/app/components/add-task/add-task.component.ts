import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  text!: string;
  day!: string;
  reminder: boolean = false;
  showAddTask: boolean = false;
  subcription: Subscription;
  
  constructor( private uiService: UiService) { 
    this.subcription = this.uiService.onToggle().subscribe(value => (this.showAddTask = value))
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.text){
      alert('Please add task')
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask)

    this.text = '';
    this.day = '';
    this.reminder = false;

  }

}
