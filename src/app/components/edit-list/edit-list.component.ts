import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskLocalService } from '../task-list/task-local.service';


@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  public listForm: FormGroup;
  urlId:string;
  title:string;

  constructor(
    private taskService: TaskLocalService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditListComponent>,
    private route: ActivatedRoute,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data
  ) { 
    this.urlId = data.linkId;
    this.title = data.title;
  }

  ngOnInit(): void {
    this.setListForm();
    console.log("EDIT LIST",this.urlId,this.title)
  }

  setListForm(){
    this.listForm = this.formBuilder.group({
      _id : this.urlId,
      title : [this.title,Validators.required]
    });
  }

  editList(title){
    
    let temp = this.taskService.getData('Todo_List');
    temp.forEach(element => {
      if (element._id == this.urlId) {
        element.title = title;
      }
    });
    this.taskService.setData('Todo_List',temp);

    this.router.navigateByUrl(`/lists/${this.urlId}`);   
    this.dialogRef.close();
    location.reload();
  }

  cancelDialog(){
    this.dialogRef.close();
  }

}
