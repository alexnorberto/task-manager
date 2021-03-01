import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskLocalService } from '../task-list/task-local.service';
import { TaskServiceService } from '../task-list/task-service.service';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  taskOrList: string;
  urlId: string;
  taskId: string;

  constructor(
    private taskService: TaskLocalService,
    public dialogRef: MatDialogRef<DeleteConfirmComponent>,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.taskOrList = data.confirm;
    this.urlId = data.listId;
    this.taskId = data.taskId;
   }

  ngOnInit(): void {
  }

  delete(){
    if (this.taskOrList === "list") {
      this.deleteList();
    } else {
      this.deleteTask();
    } 
  }

  /**
   * DELETELIST 
   * Delete the selected list passing urlId to taskService
   */

  deleteList(){
    console.log("deletou lista?",this.urlId);

    let temp = this.taskService.getData('Todo_List');
    temp.forEach((element,i) => {
      console.log("elemento",element,i);
      if (element._id == this.urlId) {
        console.log("ACHOU");
        temp.splice(i, 1);        
        console.log("temp",temp);
      }
    });   

    this.taskService.setData('Todo_List',temp);    

    this.router.navigateByUrl(`/`);
    this.cancelDialog(); 
  }

  
  /**
   * DELETETASK
   * Delete the selected task passing urlId and taskId (passed by html) to taskService
   */

  deleteTask(){
    
    let temp = this.taskService.getData('Todo_List');
    temp.forEach((element,i) => {
      console.log("elemento",element,i);
      if (element._id == this.urlId) {
        element.tasks.forEach((task,t) => {
          if (task._id == this.taskId) {
            element.tasks.splice(t,1);
          }
        });
      }
    });   

    this.taskService.setData('Todo_List',temp);    

    this.router.navigateByUrl(`/`);
    this.cancelDialog(); 


    window.location.reload();
  }


  cancelDialog(): void {
    this.dialogRef.close();
  }

}
