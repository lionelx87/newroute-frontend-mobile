import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpotPage } from './spot.page';

describe('SpotPage', () => {
  let component: SpotPage;
  let fixture: ComponentFixture<SpotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
