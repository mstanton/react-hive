import React from 'react';
import Attribute from '../components/Attribute';
import SampleList from '../components/SampleList';
import ClockComponent from '../components/feature/ClockComponent';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateClockTime } from '../state/actions/app/clockActions'

export const Clock = ( props ) => {
  console.log( 'CLOCK PAGE', props );
  return (
    <div>
      <SampleList/>
      <Attribute value="pages.clock.header" tag="h1" />

      <ClockComponent { ...props }/>
      
    </div>
  );
};