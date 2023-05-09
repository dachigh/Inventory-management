import { Component, OnInit, ViewChild } from '@angular/core';
import { Inventory } from 'src/app/models/inventory.models';
import { InventoryService } from 'src/app/services/inventory.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
    
  form: Inventory = {
    title: '',
    place: '',
    price: 0,
  };
  submitted = false;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(JSON.stringify(this.form, null, 2));
  }

  saveInventory(): void {
    const data = {
      title: this.form.title,
      place: this.form.place,
      price: this.form.price,
    };
    this.inventoryService.create(data).subscribe({
      next: (res: any) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e: any) => console.error(e),
    });
  }
  newInventory(): void {
    this.submitted = false;
    this.form = { title: '', place: '', price: 0,};
  }

  


}
