import React from 'react';
import { connect } from 'react-redux';

const ModuleDrawerOverlay = ({ isDrawerShow }) => {
    return (
        <div
            className={`ps-site-overlay ${isDrawerShow ? 'active' : ''}`}></div>
    );
};

export default connect((state) => state.app)(ModuleDrawerOverlay);
