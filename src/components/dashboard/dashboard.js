import React from 'react';
import '../../assets/css/coreui.css'
import { WorldMap } from './worldmap'
import { Summary } from './summary'
import { MainPage } from './mainpage'
import { Sidecharts  } from './sidecharts'

function Dashboard() {
    return (
        <div className="content-body">
            <WorldMap></WorldMap>
            <div className="dashboard-container">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="mb-3">
                                <Summary></Summary>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-8">
                            <MainPage></MainPage>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            {/* <Sidecharts></Sidecharts> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
