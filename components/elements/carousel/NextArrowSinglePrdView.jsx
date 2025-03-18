import React from 'react';

const NextArrowSinglePrdView = props => {
    const { className = "", onClick, icon } = props;
    return (
        <div
            className={`slick-arrow slick-next ${className}`}
            onClick={onClick}>
            {icon ? (
                <i className={icon}></i>
            ) : (
                <i className="icon-chevron-right nextvArrowSingleView"></i>
            )}
        </div>
    );
};

export default NextArrowSinglePrdView;