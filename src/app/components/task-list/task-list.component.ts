import { Component, OnInit, ViewEncapsulation } from '@angular/core';


import {MatDialog} from '@angular/material/dialog';
import { NewListComponent } from '../new-list/new-list.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NewTaskComponent } from '../new-task/new-task.component';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { EditListComponent } from '../edit-list/edit-list.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { TaskLocalService } from './task-local.service';

const todoListStorageKey = 'Todo_List';

const defaultTodoList = [
  {
    _id: '01',
    title: 'lista 1',
    tasks: [
      {
        _id: '0101',
        _listId: '01',
        title: 'task 1 lista 1',
        completed: false
      },
      {
        _id: '0102',
        _listId: '01',
        title: 'task 2 lista 1',
        completed: true
      },
      {
        _id: '0103',
        _listId: '01',
        title: 'task 3 lista 1',
        completed: false
      }
    ]

  },
  {
    _id: '02',
    title: 'lista 2',
    tasks: [
      {
        _id: '0201',
        _listId: '02',
        title: 'task 1 lista 2',
        completed: false
      },
      {
        _id: '0202',
        _listId: '02',
        title: 'task 2 lista 2',
        completed: false
      }
    ]

  },

];

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskListComponent implements OnInit {

  listOfLists = [];
  listOfTasks = [];
  urlId: string;
  activeListTitle;
  todoList = [];
    
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private taskLocalService: TaskLocalService,
    
  ) {
    this.todoList = 
     taskLocalService.getData(todoListStorageKey) || defaultTodoList;
   }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params:Params) => {
        this.urlId = params.listId;
        if (this.todoList != null) {
          this.todoList.forEach((list)=>{
            if (list._id == this.urlId){
              this.activeListTitle = list.title;
            }
          });
        }
        console.log("activeListTitle",this.activeListTitle);
      }
    );   

    this.getLists();
    this.getTasks();
    
  }

  saveList() {
    this.taskLocalService.setData(todoListStorageKey, this.todoList);
  }

  /** CLOSEDIALOG dialogRef
   * Purpose: close any opened dialog passing DialogRef got in openDialog functions
   */

  closeDialog(dialogRef){
    dialogRef.afterClosed().subscribe(() => {
      console.log('The form was closed');
    });
  }

  /**
   * OPENNEWLIST
   * Purpose: open new list dialog 
   */

  openNewList(){
    const dialogRef = this.dialog.open(NewListComponent,{
      width: '500px'
    });

    this.closeDialog(dialogRef);
  }

    /**
   * OPENNEWTASK
   * Purpose: open new task dialog 
   */


  openNewTask(){
    const dialogRef = this.dialog.open(NewTaskComponent,{
      width: '500px',
      data: this.urlId
    });

    this.closeDialog(dialogRef);
  }

    /**
   * OPENCONFIRMDELETETASK
   * 
   */

  openConfirmDelete(confirm:string,selectedTask:string){
    const dialogRef = this.dialog.open(DeleteConfirmComponent,{
       width: '500px',
       data: {
         confirm: confirm,
         listId: this.urlId,
         taskId: selectedTask
       }
     }); 
     this.closeDialog(dialogRef);
 }

   /**
   * OPENEDITLIST
   * Purpose: open edit list dialog 
   */

  openEditList(){
    const dialogRef = this.dialog.open(EditListComponent,{
      width: '500px',
      data: {
        linkId: this.urlId,
        title: this.activeListTitle
      }
    });

    this.closeDialog(dialogRef);
  }

     /**
   * OPENEDITTASK
   * Purpose: open edit task dialog 
   */

  openEditTask(selectedTask){
    const dialogRef = this.dialog.open(EditTaskComponent,{
      width: '500px',
      data: {
        listId: this.urlId,
        task: selectedTask,
      }
    });

    this.closeDialog(dialogRef);
  }


  /** 
   * GETLISTS
   * 
   */

  getLists(){
    //carregar as listas em listOflists
    this.todoList = this.taskLocalService.getData(todoListStorageKey);
    this.saveList();
    console.log(this.todoList);
  }

  /** 
   * GETLTASKS
   * 
   */

  getTasks(){
    //carregar as tasks em listOftasks

    this.route.params.subscribe(
      (params:Params) => {
        params.listId; //routing param

        this.todoList.forEach((res) =>{
          if (res._id == this.urlId) {
            console.log("teste",res.tasks);
            this.listOfTasks = res.tasks
          }
        });

      }
    );   
  }

  /**
   * 
   */

  onClickTask(task){
    //completed task = mark completed param as true
    task.completed = true;

    let temp = this.taskLocalService.getData('Todo_List');
    temp.forEach(element => {
      if (element._id == this.urlId) {
        element.tasks.forEach((t) => {
          if (t._id == task._id) {
            t.completed = true
          }
        });
      }
    });
    this.taskLocalService.setData('Todo_List',temp);

  }

 



}
