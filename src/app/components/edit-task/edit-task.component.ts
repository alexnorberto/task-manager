import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskLocalService } from '../task-list/task-local.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  public taskForm:FormGroup;

  urlId:string;
  title:string;
  taskId: string;
  completed: boolean;

  constructor(
    private taskService: TaskLocalService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditTaskComponent>,
    private route: ActivatedRoute,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data
  ) { 
    this.urlId = data.listId;
    this.title = data.task.title;
    this.taskId = data.task._id;
    this.completed = data.task.completed
  }

  ngOnInit(): void {
    this.setTaskForm();
    console.log("EDIT LIST",this.urlId,this.title,this.completed)
  }

  setTaskForm(){
    this.taskForm = this.formBuilder.group({
      title : [this.title,Validators.required],
      completed: this.completed,
      checkbox: !this.completed
    });
  }

  editTask(title:string){

    if(this.taskForm.value.checkbox) {
      this.completed = false;
    }

    let tempTask = {
      _id: this.taskId,
      _listId: this.urlId,
      title: title,
      completed: this.completed,
    }

    let temp = this.taskService.getData('Todo_List');
    temp.forEach(element => {
      if (element._id == this.urlId) {
        element.tasks.forEach((task) => {
          if (task._id == this.taskId) {
            task.title = tempTask.title;
            task.completed = tempTask.completed
          }
        });
      }
    });
    this.taskService.setData('Todo_List',temp);

    this.router.navigateByUrl(`/lists/${this.urlId}`);   
    this.dialogRef.close();
    location.reload();

  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

}
