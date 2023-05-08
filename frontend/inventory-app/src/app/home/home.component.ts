import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  items: any[] = [];
  pageSize = 5;
  currentPage: number = 1;
  pageNumbers = [];
  totalPages: any;
  pages: number[] = [];
  sortOption: string = 'name-asc'; // default sort option

  ngOnInit(): void {
    this.items = [
      { name: 'Item 1', location: 'Location 1', price: 100 },
      { name: 'Item 2', location: 'Location 2', price: 200 },
      { name: 'Item 3', location: 'Location 3', price: 300 },
      { name: 'Item 4', location: 'Location 4', price: 400 },
      { name: 'Item 5', location: 'Location 5', price: 500 },
      { name: 'Item 6', location: 'Location 6', price: 600 },
      { name: 'Item 7', location: 'Location 7', price: 700 },
      { name: 'Item 8', location: 'Location 8', price: 800 },
      { name: 'Item 9', location: 'Location 9', price: 900 },
      { name: 'Item 10', location: 'Location 10', price: 1000 },
      { name: 'Item 11', location: 'Location 11', price: 1100 },
      { name: 'Item 12', location: 'Location 12', price: 1200 },
      { name: 'Item 13', location: 'Location 13', price: 1300 },
      { name: 'Item 14', location: 'Location 14', price: 1400 },
      { name: 'Item 15', location: 'Location 15', price: 1500 },
    ];
    this.totalPages = Math.ceil(this.items.length / this.pageSize);
    this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
    this.sortOption = 'none';
  }

  deleteItem(item: any) {
    const index = this.items.indexOf(item);
    console.log(index);
    if (index >= 0) {
      this.items.splice(index, 1);
      this.updatePages(); 
    }
    this.totalPages = Math.ceil(this.items.length / this.pageSize);
  }
  updatePages(): void {
    this.totalPages = Math.ceil(this.items.length / this.pageSize);
    this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
  }
  sortItems() {
    switch (this.sortOption) {
      case 'name-asc':
        this.items.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case 'name-desc':
        this.items.sort((a, b) => (a.name < b.name ? 1 : -1));
        break;
      case 'price-asc':
        this.items.sort((a, b) => (a.price > b.price ? 1 : -1));
        break;
      case 'price-desc':
        this.items.sort((a, b) => (a.price < b.price ? 1 : -1));
        break;
    }
  }
}
