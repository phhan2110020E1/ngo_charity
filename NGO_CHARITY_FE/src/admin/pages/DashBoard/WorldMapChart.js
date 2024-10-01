/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import { ToastError, getListChartMap } from '~/admin/utils';
import { PathAdmin } from '~/routers/PathAdmin';
import Loading from '~/admin/components/Loading/Loading';

function WorldMapChart(props) {
    const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';
    const [tooltipContent, setTooltipContent] = useState('');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const handleMouseEnter = (event, geo) => {
        const { name } = geo.properties;
        const continentData = data.find((d) => d.region === name);
        if (continentData) {
            setTooltipContent(`${name}: ${continentData.member} members`);
        }
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                getListChartMap()
                    .then((result) => {
                        if (result.status === 200) {
                            setData(result.data);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.message === 'Network Error') {
                            navigate(`../${PathAdmin.adminNotFound}`);
                        } else {
                            const errorValid = error.response.data;
                            if (errorValid.status === 404) {
                                ToastError(errorValid.message);
                            }
                        }
                    });
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <Loading isLoading={isLoading} setIsLoading={setIsLoading}>
                <ReactTooltip id="my-tooltip">{tooltipContent}</ReactTooltip>
                <ComposableMap data-tip="">
                    <ZoomableGroup zoom={1}>
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const { name } = geo.properties;

                                    const continentData = data.find((d) => d.region === name);
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            style={{
                                                hover: {
                                                    fill: '#F53',
                                                    outline: 'none',
                                                },
                                            }}
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content={tooltipContent}
                                            onMouseEnter={(event) => handleMouseEnter(event, geo)}
                                            onMouseLeave={() => setTooltipContent('')}
                                            fill={continentData ? continentData.member : '#ccc'}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
                <div style={{ fontSize: 18, textAlign: 'center', color: '#292222', marginBottom: '10%' }}>
                    Membership statistics in regions around the world
                </div>
            </Loading>
        </div>
    );
}

export default WorldMapChart;
