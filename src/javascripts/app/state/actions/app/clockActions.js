

import { UPDATE_CLOCK_TIME } from './ActionTypes';

/**
 * ##############################################################
 *                     CLOCK ACTION HANDLERS
 * ##############################################################
 */

 // update the clock component with calculated values 
 // note: we could do the maths here but let's keep it in 
 // the component for now
export const updateClockTime = ( action ) => {
    return { 
      type: UPDATE_CLOCK_TIME, 

        timeString: action.timeString,
        hourDegrees: action.hourDegrees, 
        minDegrees: action.minDegrees, 
        totalDegrees: action.totalDegrees

    }
  };