import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../models/inventory.models';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

  inventories: Inventory[] = [];
  currentInventory: Inventory = {};
  currentIndex = -1;
  title = '';
  place = '';
  places = ['Main Office', 'Cavea Galleria', 'Cavea Tbilisi Mall','Cavea East Point','Cavea City Mall'];


  ItemAmount:any;
  page = 1;
  count = 0;
  pageSize = 20;
  pageSizes = [3, 6, 9];
  sortBy: string = 'title';
  sortOrder: string = ''

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.retrieveInventories();
  }

  getRequestParams(searchPlace: string, page: number, pageSize: number,sortBy: string, sortOrder: string): any {
    let params: any = {};

    if (searchPlace) {
      params[`place`] = searchPlace;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }
    if (sortBy) {
      params[`sortBy`] = sortBy;
    }
  
    if (sortOrder) {
      params[`sortOrder`] = sortOrder;
    }


    return params;
  }

  retrieveInventories(): void {

    const params = this.getRequestParams(this.place, this.page, this.pageSize, this.sortBy, this.sortOrder);

    this.inventoryService.getAll(params).subscribe(
      response => {
        const { inventories, totalItems } = response;
        this.inventories = inventories;
        this.count = totalItems;
        this.ItemAmount = totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveInventories();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveInventories();
  }

  setActiveInventory(inventory: Inventory, index: number): void {
    this.currentInventory = inventory;
    this.currentIndex = index;
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

  sort(title: string, sortOrder: string): void {
    this.page = 1;
    this.sortBy = title;
    this.sortOrder = sortOrder;
    this.retrieveInventories();
  }

}
