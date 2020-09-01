import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HighscoresPage } from './highscores.page';

describe('HighscoresPage', () => {
  let component: HighscoresPage;
  let fixture: ComponentFixture<HighscoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighscoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HighscoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
