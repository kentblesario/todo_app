import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbToast, NgbToastHeader } from '@ng-bootstrap/ng-bootstrap';
import { AddTodoService } from './services/add-todo.service';
import { CompleteTodoService } from './services/complete-todo.service';
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
  page:number = 1;
  pageSize: number = 10;
  constructor(
    public addTodoService: AddTodoService,
    public getTodoService: GetAllTodoService,
    public delTodoService: DelTodoService,
    public completeTodoService: CompleteTodoService
  ) {

  }

  ngOnInit(): void {
    this.getTodoList()
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  addTask() {
    let task = {title: this.todoTitle}
    this.addTodoService.addTodo(task).subscribe(async (res: any) => {
      if (res.success) {
       this.getTodoList();

      }
    })
  }

  updateToComplete(_id:any){
    this.completeTodoService.completeTodo(_id).subscribe(async (res: any) => {
      if (res.success) {
       this.getTodoList();

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
        this.getTodoList();
      }
    })

  }





}

