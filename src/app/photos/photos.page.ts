import {Component, OnInit} from '@angular/core';
import {FizzBuzzService} from "../../services/fizzBuzz.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-photos',
    templateUrl: './photos.page.html',
    styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {
    constructor(public fizzBuzzService: FizzBuzzService,
                private router: Router,
    ) {
    }

    ngOnInit() {
        this.fizzBuzzService.loadSaved();
    }

    clearStorage() {
        this.fizzBuzzService.storage.clear().then(r =>
            this.fizzBuzzService.highscores=[]
        );
        this.router.navigate(['/tabs/tab3'], {replaceUrl: true});
        alert('Wall of fame erased!')
    }
}
