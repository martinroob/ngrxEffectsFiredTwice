
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from './reducer';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {READ, ReadAction, ReadFailedAction, ReadSucceededAction} from './actions';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class EffectsTestEffects {
  constructor(private actions$: Actions, private store: Store<State>, private httpClient: HttpClient) {

  }

  @Effect({dispatch: false})
  readData$: Observable<Action> = this.actions$
    .ofType(READ)
    .switchMap((action: ReadAction) => {
      return this.httpClient.get('/example/data/' + action.payload)
        .map((response: any) => new ReadSucceededAction(response))
        .catch(error => Observable.of(new ReadFailedAction(error)));
    });

}
