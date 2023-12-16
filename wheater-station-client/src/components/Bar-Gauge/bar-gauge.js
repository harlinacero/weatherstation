import BarGauge, { Font, Geometry, Label, Title } from 'devextreme-react/bar-gauge';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../services/getAllRegisters.service';
import './bar-gauge.css';

// const endPoint = 'readAvg?column=temperature';
// const title = "Temperatura";

//how send parameters to another component in react?


const GaugeComponent = (props) => {
    const [ data, setData ] = useState(null);


    useEffect(() => {
        const fetchDataWhether = async () => {
            try {
                setInterval(async () => {
                    const result = await fetchData(props.endpoint);
                    const avgvalue = [];
                    avgvalue.push(result[ 0 ].avg_amount);
                    setData(avgvalue);
                }, 30000);
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchDataWhether();
    }, [ props.endpoint ]);

    const format = {
        type: 'fixedPoint',
        precision: 1,
    };

    return (
        <BarGauge
            id="gauge"
            startValue={props.min}
            endValue={props.max}
            values={data}
            relativeInnerRadius={0.5}
            palette={props.color}
        >
            <Geometry
                startAngle={180}
                endAngle={0}>
            </Geometry>
            <Label indent={30} format={format} />
            <Title text={props.title}>
                <Font size={28} />
            </Title>
        </BarGauge>
    );

};

export default GaugeComponent;