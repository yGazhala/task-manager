import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseTask } from '../../models/task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  // Вхідний параметр від батьківського компонента
  @Input() public task: BaseTask;

  // Подія, що емітується до батьківського компонента
  @Output() public remove = new EventEmitter<string>();
}
