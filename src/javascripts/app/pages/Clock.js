import React from 'react';
import Attribute from '../components/Attribute';
import SampleList from '../components/SampleList';
import ClockComponent from '../components/feature/ClockComponent';

export const Clock = (props) => {
  return (
    <div>
      <Attribute value="pages.clock.header" tag="h1" />
      <ClockComponent/>
      <SampleList />
    </div>
  );
};
