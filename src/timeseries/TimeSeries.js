import React, {Component} from 'react';
import Highcharts from 'highcharts/highstock';
import {
    Chart,
    HighchartsStockChart,
    Legend,
    Navigator,
    SplineSeries,
    Title,
    Tooltip,
    withHighcharts,
    XAxis,
    YAxis
} from 'react-jsx-highstock';

class TimeSeries extends Component {

    onRangeSet(event) {
        const minDate = new Date(event.min);
        const maxDate = new Date(event.max);
        this.props.onRangeSet({min: minDate, max: maxDate});
    }

    render() {
        const reviewCount = this.props.reviewCounts.map(item => [item[0], item[1]]);
        const avgRatings = this.props.averages.map(item => [item[0], item[1]]);

        if (reviewCount.length === 0) {
            return <div/>;
        }

        return (
            <div>
                <HighchartsStockChart>
                    <Chart zoomType="x" onLoad={(event) => this.onRangeSet(event)}/>

                    <Title>Number of Reviews by Date vs Average Ratings</Title>

                    <Legend/>

                    <XAxis>
                        <XAxis.Title>Time</XAxis.Title>
                    </XAxis>

                    <YAxis id="reviews">
                        <YAxis.Title>Number of reviews</YAxis.Title>
                        <SplineSeries id="reviewCount" name="Number of Reviews" data={reviewCount}/>
                    </YAxis>

                    <XAxis onAfterSetExtremes={(event) => this.onRangeSet(event)}>
                        <XAxis.Title>Time</XAxis.Title>
                    </XAxis>

                    <YAxis id="ratings" opposite>
                        <YAxis.Title>Average rating</YAxis.Title>
                        <SplineSeries id="avgRatings" name="Average Ratings" data={avgRatings}/>
                    </YAxis>

                    <Tooltip shared={true}/>

                    <Navigator>
                        <Navigator.Series seriesId="reviewCount"/>
                        <Navigator.Series seriesId="avgRatings"/>
                    </Navigator>
                </HighchartsStockChart>
            </div>
        )
    }
}

export default withHighcharts(TimeSeries, Highcharts);