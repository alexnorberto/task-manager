import { Component, OnInit, Optional, ɵɵqueryRefresh } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskLocalService } from '../task-list/task-local.service';


@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  public listForm: FormGroup;
  newId: string;

  constructor(
    private taskService: TaskLocalService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewListComponent>,
    private route: ActivatedRoute,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    this.setListForm();
  }

  setListForm(){
    this.listForm = this.formBuilder.group({
      _id : [null],
      title : ['',Validators.required]
    });
  }

  createNewList(newTitle:string){

    let newList = {
      _id: (new Date().getTime()).toString(),
      title: newTitle,
      tasks: []
    }

    console.log("novo elemento:",newList);

    let temp = this.taskService.getData('Todo_List');
    temp.push(newList);
    this.taskService.setData('Todo_List',temp);

    console.log("lista atualizad:",temp);

    this.router.navigateByUrl(`/lists/${newList._id}`);
 
    this.dialogRef.close();
    location.reload();
  }

  


}
