import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTodoService } from './services/add-todo.service';
import { DelTodoService } from './services/del-todo.service';
import { GetAllTodoService } from './services/get-all-todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MEAN TODO APP';
  tasks:any= [];
  todoTitle = '';
  constructor(
    public addTodoService: AddTodoService,
    public getTodoService: GetAllTodoService,
    public delTodoService: DelTodoService,
  ) {

  }

  ngOnInit(): void {
    this.getTodoList()
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  addTask() {
    console.log(this.todoTitle);
    this.addTodoService.addTodo().subscribe(async (res: any) => {
      if (res.success) {
        console.log(res.data);

      }
    })
  }

  getTodoList(){
    this.getTodoService.getTodoList().subscribe(async (res: any) => {
      if (res.success) {
        console.log(res.data);
        this.tasks = res.data
      }
    })
  }

  delTask(_id:any){
    this.delTodoService.delTodo(_id).subscribe(async (res: any) => {
      if (res.success) {
        console.log(res.data);

      }
    })

  }





}

