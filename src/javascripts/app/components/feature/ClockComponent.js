import React from 'react';


export default class ClockComponent extends React.Component {
    constructor( props ) {
        super( props );

        //this.calculateDegrees = this.calculateDegrees.bind( this );
        this.handleInput = this.handleInput.bind( this );

        this.updateClockTime = this.props.actions.updateClockTime;
    }

    calculateDegrees = ( timeString ) => { 
        const hours = parseFloat( timeString.slice( 0, 2 ), 10 ) % 12;
        const mins = parseFloat( timeString.slice( 3, 5 ), 10 );

        // Calculate Angle Sums 
        const hourDegrees = 0.5 * ( 60 * hours + mins );
        const minDegrees = 6.0 * mins;
        const totalDegrees =  minDegrees > hourDegrees ? minDegrees - hourDegrees : hourDegrees - minDegrees;

        const clock = {
            timeString: timeString,
            hourDegrees: hourDegrees,
            minDegrees: minDegrees,
            totalDegrees: totalDegrees
        };

        return clock
    };

    handleInput( event ) {
        let timeString = event.target.value; 
        let calculatedValues = this.calculateDegrees( timeString );

        // 
        this.updateClockTime( calculatedValues  );
    }

    render() {
        const { timeString, hourDegrees, minDegrees, totalDegrees } = this.props.data.clock;
        return (
            <div>
                <br/>
                <div className="container app-container">  
                    <div className="row">
                        <div className="col-xs-6">
                            <table className="table table-bordered table-condensed">
                                <thead>
                                    <tr>
                                        <th style={{ paddingLeft: '20px'}}>
                                            <h4><strong>Measure Clock Position</strong></h4>
                                        </th>
                                        <th style={ { textAlign: 'center' } }>
                                            <h4><strong>Unit: deg.&deg;</strong></h4>
                                        </th>
                                    </tr> 
                                </thead>      
                                <tbody>
                                    <tr>
                                        <td style={{ paddingLeft: '20px'}}><h4>Hour Hand</h4></td>
                                        <td style={ { textAlign: 'center' } }>
                                            <h4>{ hourDegrees || 0 }&deg;</h4>
                                        </td>                                        
                                    </tr>
                                    <tr>
                                        <td style={{ paddingLeft: '20px'}}><h4>Minute Hand</h4></td>
                                        <td style={ { textAlign: 'center' } }>
                                            <h4>{ minDegrees || 0 }&deg;</h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ paddingLeft: '20px'}}><h4>Total Degrees Between Hands</h4></td>
                                        <td style={ { textAlign: 'center' } }>
                                            <h4>{ totalDegrees || 0 }&deg;</h4>
                                        </td>
                                    </tr>
                                </tbody>    
                            </table>   
                        </div>
                        <div className="col-xs-4">
                            <form className="form-inline form-time">
                                <label className="form-label">Enter Time: &nbsp;&nbsp;  
                                        { /* time input type is poorly supported... YOLO */ }
                                        <input id="time"
                                            name="time" 
                                            type="time"
                                            className="form-control time-input"
                                            onChange={ this.handleInput }
                                        /> 
                                </label>
                            </form>
                        </div>    
                    </div>
                    <div className="row">
                        <div className="col-xs-12 app-footer">
                            <p>-ref: <a href="https://en.wikipedia.org/wiki/Clock_angle_problem">https://en.wikipedia.org/wiki/Clock_angle_problem</a></p>
                        </div>
                   </div>  
                </div>        
            </div>
        );
    }
}



