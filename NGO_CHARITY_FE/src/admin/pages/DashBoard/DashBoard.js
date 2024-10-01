import WorldMapChart from './WorldMapChart';

function DashBoard(props) {
    return (
        <div className="admin__pages__content-page--card" style={{ minHeight: '500px' }}>
            <div style={{ width: 700 }}>
                <WorldMapChart />
            </div>
        </div>
    );
}

export default DashBoard;
