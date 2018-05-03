import { Component, OnInit } from '@angular/core';
import { FormsModule  } from "@angular/forms";


@Component({
  selector: 'app-MoneyEntry',
  templateUrl: './MoneyEntry.component.html',
  styleUrls: ['./MoneyEntry.component.scss']
})
export class MoneyEntryComponent  {
  public selectedType = 'Debit';
  checked = false;

  constructor() { }

  ngOnInit() {
  }

  test() {
    console.log(this.checked);
  }


}
