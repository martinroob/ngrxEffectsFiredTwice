import {HttpErrorResponse} from '@angular/common/http';
import * as effectstest from './actions';

export interface State {
  reading: boolean;
  message?: string;
  error?: HttpErrorResponse;
}

const initialState: State = {
  reading: false,
};

export function reducer(state: State = initialState, action: effectstest.Actions): State {

  switch (action.type) {

    case effectstest.READ: {
      return {reading: true};
    }

    case effectstest.READ_SUCCEEDED: {
      return {reading: false, message: (<effectstest.ReadSucceededAction>action).payload.message};
    }

    case effectstest.READ_FAILED: {
      return {reading: false, error: (<effectstest.ReadFailedAction>action).payload};
    }

    default: {
      return state;
    }
  }
}

