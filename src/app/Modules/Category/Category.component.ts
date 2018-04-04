import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService  } from "../../Services/Categories.service";
import { Category  } from "../../Models/Category";
import { DataSource} from '@angular/cdk/collections';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-Category',
  templateUrl: './Category.component.html',
  styleUrls: ['./Category.component.css']
})
export class CategoryComponent implements OnInit {
  public categories: Category[] = [];
  public category: Category = new Category();

  constructor(private service: CategoriesService)   { 
    this.categories = service.Categories;
  }

  ngOnInit() {
    this.service.loadCategories()
      .subscribe(() => this.categories = this.service.Categories);
  }

  writeIt() {
    console.log(this.category.description);
  }

  save() {
    console.log('category: ' + this.category.description);
  }
}

// /** An example database that the data source uses to retrieve data for the table. */
// export class ExampleDatabase {
//   /** Stream that emits whenever the data has been modified. */
//   dataChange: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
//   get data(): Category[] { return this.dataChange.value; }

//   constructor() {
//     // Fill up the database with 100 users.
//     for (let i = 0; i < 100; i++) { this.addUser(); }
//   }

//   /** Adds a new user to the database. */
//   addUser() {
//     const copiedData = this.data.slice();
//     copiedData.push(this.createNewUser());
//     this.dataChange.next(copiedData);
//   }

//   /** Builds and returns a new User. */
//   private createNewUser() {
//     const name =
//         NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//         NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//     return {
//       id: (this.data.length + 1).toString(),
//       name: name,
//       progress: Math.round(Math.random() * 100).toString(),
//       color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//     };
//   }
// }

// export class ExampleDataSource extends DataSource<any> {
//   constructor(private _exampleDatabase: ExampleDatabase) {
//     super();
//   }

//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   connect(): Observable<UserData[]> {
//     return this._exampleDatabase.dataChange;
//   }

//   disconnect() {}
// }