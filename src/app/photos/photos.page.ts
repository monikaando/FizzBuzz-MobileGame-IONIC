import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import {FizzBuzzService} from "../../services/fizzBuzz.service";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {
  constructor(public photoService: PhotoService,
              public fizzBuzzService: FizzBuzzService
  ) {
  }

  ngOnInit() {
    this.photoService.loadSaved();
  }
}
