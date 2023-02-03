import './Chart.css';
import ChartBar from './ChartBar';

export default function Chart(props) {
    const dataPointValues = props.dataPoints.map(point => point.value);
    const maxValue = Math.max(...dataPointValues);

    const bars = props.dataPoints.map((dataPoint) => (
        <ChartBar
            key={dataPoint.label}
            value={dataPoint.value}
            maxValue={maxValue}
            label={dataPoint.label}
        />
    ))
    return (
        <div className='chart'>
            {bars}
        </div>
    );
}
