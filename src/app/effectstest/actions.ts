import { Action } from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

export const READ = '[EffectsTest] Read';
export const READ_SUCCEEDED = '[EffectsTest] (Effect) Read Succeeded';
export const READ_FAILED = '[EffectsTest] (Effect) Read Failed';

export class ReadAction implements Action {
  readonly type = READ;

  constructor(public payload: string) {}
}

export class ReadSucceededAction implements Action {
  readonly type = READ_SUCCEEDED;

  constructor(public payload: {message: string}) {}
}

export class ReadFailedAction implements Action {
  readonly type = READ_FAILED;

  constructor(public payload: HttpErrorResponse) {}
}

export type Actions
  = ReadAction
  | ReadSucceededAction
  | ReadFailedAction;

