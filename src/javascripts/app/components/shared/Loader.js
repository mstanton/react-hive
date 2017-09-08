'use strict';

/**
 * Module Definition
 *
 */

import React from 'react';
// import { isEqual } from '../utils';

/**
 * Class Definition
 * todo: make it a function like the cool kids
 */
export default class Loader extends React.Component  {
    constructor( props ) {
		super( props );
	}

	render() {
		const{ isFetching } = this.props;
		return (    
			isFetching ? <div className="loader-container"> 
				<h1>Hold on a second I am loading....</h1>
				<img src="../images/ajax-loader.gif" width="100" height="100"/>
			</div> 		
			: 
			null
		)      
	}
          
};