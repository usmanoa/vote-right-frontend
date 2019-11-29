import React from 'react';
import Particles from 'react-particles-js';
import './layout.css';
import { Typography } from 'antd';
import { particleParameters } from './constants';

const { Title } = Typography;

/**
 * Default layout for pages
 *
 * @function
 * @param {func} ComponentOne - one of two component to display
 * @param {func} ComponentTwo - one of two component to display
 * @return {Component} the jsx component for default page layout
 */
const withLayout = (ComponentOne = 'div', ComponentTwo = 'div') => () => (
    <div>
        <div className="layout">
            <div className="whiteSection">
                <div className="heading">
                    <Title level={1}><span className="headingText">Vote-Right</span></Title>
                </div>
                <ComponentOne />
            </div>
            <div className="blueSection -blue">
                <ComponentTwo />
                <Particles
                    params={particleParameters}
                    className="particle"
                />
            </div>
        </div>
    </div>
);

export default withLayout;