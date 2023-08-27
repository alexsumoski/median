import { Component, OnInit } from '@angular/core';
import { DBService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
  data: any[] = [];

  constructor(private dbService: DBService) {}

  ngOnInit() {
    this.dbService.getPosts().subscribe((data) => {
      this.data = data;
      console.log(data);
    });
  }
}
