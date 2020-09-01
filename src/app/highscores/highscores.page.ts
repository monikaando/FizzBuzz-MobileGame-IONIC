import { Component, OnInit } from '@angular/core';
import {FizzBuzzService} from '../../services/fizzBuzz.service';
import {FormBuilder, FormGroup } from '@angular/forms';
import {Router} from "@angular/router";
import {Camera, CameraOptions} from "@ionic-native/camera/ngx";


@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.page.html',
  styleUrls: ['./highscores.page.scss'],
})
export class HighscoresPage implements OnInit {
  private form : FormGroup;
  highScore: number;
  image:string
  constructor(
      private camera: Camera,
      private fizzBuzzService: FizzBuzzService,
      private formBuilder: FormBuilder,
      private router: Router,
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
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
    });
  }

  saveHighScore() {
    this.fizzBuzzService.highscores.push({name: this.form.value, score: this.highScore, photo: this.image});
    this.fizzBuzzService.highscores.sort((a, b) => {
      return b.score - a.score;
    });
    this.fizzBuzzService.storage.set('highscores', this.fizzBuzzService.highscores);
    this.router.navigate(['/photos'], {replaceUrl: true});
  }
}
