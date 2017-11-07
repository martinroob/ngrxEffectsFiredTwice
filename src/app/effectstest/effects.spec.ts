import {EffectsTestEffects} from './effects';
import {Observable} from 'rxjs/Observable';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {StoreModule} from '@ngrx/store';
import {reducer} from './reducer';
import {EffectsModule} from '@ngrx/effects';
import {ReadAction, ReadSucceededAction} from './actions';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subject} from 'rxjs/Subject';

describe('EffectsTest #effects', () => {
  let effects: EffectsTestEffects;
  let actions: Subject<any>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducer),
        EffectsModule.forRoot([EffectsTestEffects]),
        HttpClientTestingModule
      ],
      providers: [
        provideMockActions(() => actions)
      ]
    });
    effects = TestBed.get(EffectsTestEffects);
    inject([EffectsTestEffects, HttpTestingController], (_effects, _httpMock) => {
      effects = _effects;
      httpMock = _httpMock;
    })();
  });

  it('readData$ effect should be initiated by READ action and then call the backend', () => {
    const initiator: ReadAction = new ReadAction('test1');
    actions = new ReplaySubject();
    actions.next(initiator);

    const expectedAction: ReadSucceededAction = new ReadSucceededAction(null);
    effects.readData$.subscribe((action: ReadSucceededAction) => {
      expect(action.type).toBe(expectedAction.type);
      expect(action.payload.message).toBe('a message from backend');
    });
    const req = httpMock.expectOne('/example/data/test1');
    expect(req.request.method).toEqual('GET');
    const responseData = {message: 'a message from backend'};
    req.flush(responseData);
    httpMock.verify();
  });

  it('Once again: readData$ effect should be initiated by READ action and then call the backend', () => {
    const initiator: ReadAction = new ReadAction('test2');
    actions = new ReplaySubject();
    actions.next(initiator);

    const expectedAction: ReadSucceededAction = new ReadSucceededAction(null);
    effects.readData$.subscribe((action: ReadSucceededAction) => {
      expect(action.type).toBe(expectedAction.type);
      expect(action.payload.message).toBe('a message from backend');
    });
    const req = httpMock.expectOne('/example/data/test2');
    expect(req.request.method).toEqual('GET');
    const responseData = {message: 'a message from backend'};
    req.flush(responseData);
    httpMock.verify();
  });
});
