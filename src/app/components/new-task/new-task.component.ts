import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskLocalService } from '../task-list/task-local.service';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  public taskForm: FormGroup;
  urlId: string;

  constructor(
    private taskService: TaskLocalService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewTaskComponent>,
    private route: ActivatedRoute,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.urlId = data;
   }

  ngOnInit(): void {    
    this.setListForm(this.urlId);
  }

  setListForm(listId:string){
    this.taskForm = this.formBuilder.group({
      _id : [null],
      title : ['',Validators.required],
      _listId: listId 
    });
  }

  createNewTask(newTitle:string){
    console.log("ENTROU NA TASK");
    console.log(this.urlId,newTitle);

    if (this.urlId) {

      let newTask = {
        _id: (new Date().getTime()).toString(),
        _listId: this.urlId,
        title: newTitle,
        completed: false
      }
  
      console.log("novo elemento:",newTask);

      let temp = this.taskService.getData('Todo_List');

      temp.forEach(element => {
        console.log("elenment:",element)
        if (element._id == this.urlId) {
          element.tasks.push(newTask);
        }
      });
      this.taskService.setData('Todo_List',temp);
  
      console.log("lista atualizad:",temp);

      this.router.navigateByUrl(`/lists/${this.urlId}`);

      this.cancelDialog();    
    } else {
      console.log('nada');
    }
  }

  cancelDialog(): void {
    this.dialogRef.close();
    window.location.reload();
  }


}
