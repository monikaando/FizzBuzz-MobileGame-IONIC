import {Injectable, Input} from '@angular/core';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import {GamePage} from "../game/game.page";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  photo:any;
  public photos: Photo[] = [];
  constructor(private camera: Camera, private storage: Storage) {}
@Input() game: GamePage

takePicture() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

this.camera.getPicture(options).then((imageData) => {
    // Add new photo to gallery
    this.photos.unshift({
      data: 'data:image/jpeg;base64,' + imageData + this.game.score$
    });
    // Save all photos for later viewing
    this.storage.set('photos', this.photos);
  }, (err) => {
    // Handle error
    console.log("Camera issue: " + err);
  });
}

  loadSaved() {
    this.storage.get('photos').then((photos) => {
      this.photos = photos || [];
    });
  }
}
class Photo {
  data: any;
}
