import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  recipeForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      chef_name: new FormControl("", [Validators.required]),
      location: new FormControl("", [Validators.required]),
      reciepe: this.fb.array([
        this.fb.group({
          reciepe_name: ['', Validators.required],
          ingredient: ['', Validators.required],
          cooking_time: ['', Validators.required],
        }),
      ]),
    });
  }


  get itemControls(): any {
    return this.recipeForm.get('reciepe') as FormArray;
  }

  addItem() {
    const items = this.recipeForm.get('reciepe') as FormArray;
    if (!items.invalid) {
      items.push(
        this.fb.group({
          reciepe_name: ['', Validators.required],
          ingredient: ['', Validators.required],
          cooking_time: ['', Validators.required],
        })
      );
    }
  }

  submitForm() {
    console.log(this.recipeForm.value);
  }
  
  removeItem(index: any) {
    const items = this.recipeForm.get('reciepe') as FormArray;
    items.removeAt(index);
  }
}


// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],

// })
// export class AppComponent {
//   myForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.myForm = this.fb.group({
//       items: this.fb.array([
//         this.fb.group({
//           name: ['', Validators.required, Validators.minLength(3)],
//           quantity: ['', [Validators.required, Validators.min(0)]],
//         }),
//         this.fb.group({
//           name: ['', Validators.required, Validators.minLength(3)],
//           quantity: ['', [Validators.required, Validators.min(0)]],
//         }),
//       ]),
//     });
//   }

//   get itemControls() {
//     return (this.myForm.get('items') as FormArray).controls;
//   }

//   get name() {
//     return this.myForm.get('name');
//   }

//   get quantity() {
//     return this.myForm.get('quantity');
//   }

//   patchValues() {
//     const newValues = [
//       { name: 'Item 1', quantity: 5 },
//       { name: 'Item 2', quantity: 10 },
//     ];
//     const items = this.myForm.get('items') as FormArray;
//     items.patchValue(newValues);
//   }
// }
