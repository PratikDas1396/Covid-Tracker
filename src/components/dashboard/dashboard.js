import React from 'react';
import '../../assets/css/coreui.css'
import { WorldMap } from './worldmap'
import { Summary } from './summary'
import { MainPage } from './mainpage'
import { Sidecharts } from './sidecharts'

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
                            <div className="custom-card">
                                <div className="heading-container">About this data</div>
                                <hr></hr>
                                <div>
                                    <span className="disclaimer-heading">It changes rapidly</span>
                                    <br></br>
                                    <span className="disclaimer-text">This data changes rapidly and might not reflect some cases still being reported.</span>
                                </div>
                                <hr></hr>
                                <div>
                                    <span className="disclaimer-heading">Resource</span>
                                    <br></br>
                                    <a className="disclaimer-text" href="https://disease.sh/">
                                        https://disease.sh/
                                    </a>
                                </div>

                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <Sidecharts></Sidecharts>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
