import DataGrid, { LoadPanel, Pager, Paging, Sorting } from 'devextreme-react/data-grid';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../services/getAllRegisters.service';
import './data-grid.css';

// const columns = [ 'id', 'sensor', 'location', 'humidity', 'temperature', 'pressure', 'altitude', 'reading_time' ];
const allowedPageSizes = [ 10, 15, 20 ];

const GridComponent = (props) => {
    const [ data, setData ] = useState(null);


    useEffect(() => {
        const endpoint = props.endpoint;
        const fetchDataWhether = async () => {
            try {
                setInterval(async () => {
                    const result = await fetchData(endpoint);
                    setData(result);
                }, 30000);
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchDataWhether();
    }, [ props.endpoint ]);


    return (
        <DataGrid
            dataSource={data}
            keyExpr={props.id}
            id='gridContainer'
            showBorders={true}
            rowAlternationEnabled={true}
            columnHidingEnabled={true}
            width="100%">

            <Sorting mode="multiple" />
            <Paging defaultPageSize={10} />
            <Pager
                showPageSizeSelector={true}
                allowedPageSizes={allowedPageSizes}
                showInfo={true}
                showNavigationButtons={true}
            />
            <Sorting mode="none" />
            <LoadPanel enabled={false} />
        </DataGrid>
    );
};

export default GridComponent;