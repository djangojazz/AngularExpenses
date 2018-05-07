import { Component, OnInit } from '@angular/core';



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
