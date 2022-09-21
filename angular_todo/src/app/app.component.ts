import { UpdateTodoService } from './services/update-todo.service';
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
  public total: number = 0;
  public itemsPerPage: number = 5;
  public p: number = 1;

  taskEditable:any;
  isEdit = false
  constructor(
    public addTodoService: AddTodoService,
    public getTodoService: GetAllTodoService,
    public delTodoService: DelTodoService,
    public completeTodoService: CompleteTodoService,
    public updateTodoService:UpdateTodoService
  ) {

  }

  changePageSize(){
    this.getTodoList(1)
   }

  ngOnInit(): void {
    this.getTodoList(1)

  }

  addTask() {
    let task = {title: this.todoTitle}
    this.addTodoService.addTodo(task).subscribe(async (res: any) => {
      if (res.success) {
       this.getTodoList(1);
       this.todoTitle = '';

      }
    })
  }

  updateTask(){
    this.updateTodoService.updateToDo(this.taskEditable).subscribe(async (res: any) => {
      if (res.success) {
       this.getTodoList(1);
        this.cancelEdit()
      }
    })
  }

  cancelEdit(){
    this.taskEditable = '';
    this.isEdit = false

  }

  updateToComplete(_id:any){
    this.completeTodoService.completeTodo(_id).subscribe(async (res: any) => {
      if (res.success) {
       this.getTodoList(1);

      }
    })
  }

  editTask(task:any){
    this.taskEditable = task;
    this.isEdit = true
  }

  getTodoList(page:number){
    let pagination = {
      page: page,
      itemsPerPage: this.itemsPerPage,
    }
    this.getTodoService.getTodoList(pagination).subscribe(async (res: any) => {
      if (res.success) {
        this.total=res.totalCount;
        this.tasks = res.data;
        this.p = page;
      }
    })
  }

  delTask(_id:any){
    this.delTodoService.delTodo(_id).subscribe(async (res: any) => {
      if (res.success) {
        this.getTodoList(1);
      }
    })

  }





}

