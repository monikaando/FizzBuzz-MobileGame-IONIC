import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {
  constructor(public photoService: PhotoService) {
  }

  ngOnInit() {
    this.photoService.loadSaved();
  }
}
