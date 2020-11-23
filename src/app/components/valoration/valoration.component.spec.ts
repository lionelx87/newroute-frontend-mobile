import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValorationComponent } from './valoration.component';

describe('ValorationComponent', () => {
  let component: ValorationComponent;
  let fixture: ComponentFixture<ValorationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValorationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
