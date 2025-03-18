import React from "react";

const PrevArrowSinglePrdView = (props) => {
    const { className, onClick, icon } = props;
    return (
        <div
            className={`slick-arrow slick-prev ${className}`}
            onClick={onClick}>
            {icon ? (
                <i className={icon}></i>
            ) : (
                <i className="icon-chevron-left prevArrowSingleView"></i>
            )}
        </div>
    );
};

export default PrevArrowSinglePrdView;
