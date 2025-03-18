import React from "react";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";

const RatingPrdSingleView = (props) => {
    const { estadoproducto } = props;
    return (
        <div className="ps-product__rating">
            {estadoproducto == 1 ? (
                <Row className="mt-1">
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingleviewdos fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingle fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingle fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingle fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingle fa fa-cog"></i>
                    </Col>
                </Row>
            ) : estadoproducto == 2 ? (
                <Row className="mt-1">
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingleviewdos fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingleviewdos fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingle fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingle fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingle fa fa-cog"></i>
                    </Col>
                </Row>
            ) : estadoproducto == 3 ? (
                <Row className="mt-1">
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingleviewdos fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingleviewdos fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingleviewdos fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingle fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingle fa fa-cog"></i>
                    </Col>
                </Row>
            ) : estadoproducto == 4 ? (
                <Row className="mt-1">
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingleviewdos fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingleviewdos fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingleviewdos fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingleviewdos fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingle fa fa-cog"></i>
                    </Col>
                </Row>
            ) : estadoproducto == 5 ? (
                <Row className="mt-1">
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingleviewdos fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingleviewdos fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingleviewdos fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingleviewdos fa fa-cog"></i>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                        <i className="ratingprdsingleviewdos fa fa-cog"></i>
                    </Col>
                </Row>
            ) : null}
        </div>
    );
};

export default RatingPrdSingleView;
