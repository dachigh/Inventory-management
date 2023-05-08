import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../models/inventory.models';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

  inventories?: Inventory[];
  currentInventory: Inventory = {};
  currentIndex = -1;
  title = '';
  place = '';

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.retrieveInventories();
  }

  retrieveInventories(): void {
    this.inventoryService.getAll().subscribe({
      next: (data) => {
        this.inventories = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveInventories();
    this.currentInventory = {};
    this.currentIndex = -1;
  }

  deleteInventory(inventory: Inventory): void {
    this.inventoryService.delete(inventory.id).subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e),
    });
  }
  places = ['Main Office', 'Cavea Galleria', 'Cavea Tbilisi Mall','Cavea East Point','Cavea City Mall'];


}
