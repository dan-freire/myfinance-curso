import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {

  @Input() items: Array<BreadCrumbItem> = [];

  constructor() { }

  ngOnInit() {
  }

  isLastItem(item: BreadCrumbItem): boolean {

    const index = this.items.indexOf(item);

    return (index + 1) == this.items.length;
  }

}

interface BreadCrumbItem {

  texto: string,
  link?: string
}