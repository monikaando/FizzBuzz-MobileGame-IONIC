import {Injectable, Input} from '@angular/core';
import {CameraOptions, Camera} from '@ionic-native/camera/ngx';
import {Storage} from '@ionic/storage';
import {GamePage} from "../game/game.page";

@Injectable({
    providedIn: 'root'
})
export class PhotoService {
    photo: any;
    public photos: Photo[] = [];
    public score: Score[] = [];

    constructor(private camera: Camera,
                private storage: Storage,
                // private game: GamePage,
    ) {
    }
    @Input() game: GamePage
    // takePicture() {
    //     const options: CameraOptions = {
    //         quality: 100,
    //         destinationType: this.camera.DestinationType.DATA_URL,
    //         encodingType: this.camera.EncodingType.JPEG,
    //         mediaType: this.camera.MediaType.PICTURE
    //     };
    //
    //     this.camera.getPicture(options).then((imageData) => {
    //         // Add new photo to gallery
    //         this.photos.unshift({
    //             data: 'data:image/jpeg;base64,' + imageData,
    //         });
    //         // Save all photos and scores for later viewing
    //         this.storage.set('photos', this.photos);
    //
    //     }, (err) => {
    //         // Handle error
    //         console.log("Camera issue: " + err);
    //     });
    //     this.score.unshift({
    //         data: this.game.score
    //     })
    //
    //     this.storage.set('score', this.game.score)
    // }


    loadSaved() {
        this.storage.get('photos').then((photos) => {
            this.photos = photos || [];
        });
        this.storage.get('score').then((score) => {
            this.score = score || [];
        })
    }
}

class Photo {
    data: any;
}

class Score {
    data: any;
}
