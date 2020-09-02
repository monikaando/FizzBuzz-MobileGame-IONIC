import {Component, OnInit} from '@angular/core';
import {FizzBuzzService} from '../../services/fizzBuzz.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
import {Camera, CameraOptions} from "@ionic-native/camera/ngx";
import {Storage} from "@ionic/storage";
import {PhotoService} from "../services/photo.service";


@Component({
    selector: 'app-highscores',
    templateUrl: './highscores.page.html',
    styleUrls: ['./highscores.page.scss'],
})
export class HighscoresPage implements OnInit {
    private form: FormGroup;
    highScore: number;
    image = '../../assets/images/avatar.png'

    constructor(
        private camera: Camera,
        private fizzBuzzService: FizzBuzzService,
        private formBuilder: FormBuilder,
        private router: Router,
        private storage: Storage,
        public photoService: PhotoService
    ) {
        this.form = this.formBuilder.group({
            name: [''],
        });
    }

    ngOnInit() {
        this.highScore = this.fizzBuzzService.highscore$.value;
    }

    takePicture() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true
        };

        this.camera.getPicture(options).then((imageData) => {
            this.image = 'data:image/jpeg;base64,' + imageData;
            this.photoService.photos.unshift({
                data: this.image
            });
            // Save all photos for later viewing
            this.storage.set('photos', this.photoService.photos);
        }, (err) => {
            // Handle error
            console.log("Camera issue: " + err);
        });
        console.log(this.form)
    }

    saveHighScore() {
        this.fizzBuzzService.highscores.push({name: this.form.value.name, score: this.highScore, photo: this.image});
        this.fizzBuzzService.highscores.sort((a, b) => {
            return b.score - a.score;
        });
        this.fizzBuzzService.storage.set('highscores', this.fizzBuzzService.highscores);
        this.router.navigate(['/tabs/tab3'], { replaceUrl: true });
    }
    playAgain() {
        this.router.navigate(['/tabs/tab2'], { replaceUrl: true });
    }
}

