import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  projectStatuses = ['Stable', 'Critical', 'Finished'];

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'projectName': new FormControl('', Validators.required, this.validProjectName.bind(this)),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'projectStatus': new FormControl('')
    });
  }

  onSubmit(): void {
    console.log(this.myForm);
  }

  validProjectName(c: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          if (c.value === 'Test') {
            resolve({ 'nameInvalid': true });
          } else {
            resolve(null);
          }
          resolve(null);
        }, 500);
    });
    return promise;
  }
}
