import React from "react";

const PopularCategories = () => {
    return (
        <div className="ps-section--category">
            <div className="container">
                <h3 className="ps-section__title">
                    Mira las categorías más populares
                </h3>
                <div className="ps-category--block">
                    <div className="ps-category__thumbnail">
                        <a className="ps-category__image" href="#">
                            <img
                                src="/static/img/categoriaspopulares/motocicletas.jpg"
                                alt=""
                            />
                        </a>
                        <div className="ps-category__content">
                            <a className="ps-category__name" href="#">
                                Motocicletas
                            </a>
                            <a className="ps-category__more" href="#">
                                Mas
                            </a>
                        </div>
                    </div>
                    <div className="ps-category__thumbnail">
                        <a className="ps-category__image" href="#">
                            <img
                                src="/static/img/categoriaspopulares/accesorios.jpg"
                                alt=""
                            />
                        </a>
                        <div className="ps-category__content">
                            <a className="ps-category__name" href="#">  
                                Accesorios
                            </a>
                            <a className="ps-category__more" href="#">
                                Mas
                            </a>
                        </div>
                    </div>
                    <div className="ps-category__thumbnail">
                        <a className="ps-category__image" href="#">
                            <img
                                src="/static/img/categoriaspopulares/bicicletas.jpg"
                                alt=""
                            />
                        </a>
                        <div className="ps-category__content">
                            <a className="ps-category__name" href="#">
                                Bicicletas
                            </a>
                            <a className="ps-category__more" href="#">
                                Mas
                            </a>
                        </div>
                    </div>
                    <div className="ps-category__thumbnail">
                        <a className="ps-category__image" href="#">
                            <img
                                src="/static/img/categoriaspopulares/llantas.jpg"
                                alt=""
                            />
                        </a>
                        <div className="ps-category__content">
                            <a className="ps-category__name" href="#">
                                Llantas
                            </a>
                            <a className="ps-category__more" href="#">
                                More
                            </a>
                        </div>
                    </div>
                    <div className="ps-category__thumbnail">
                        <a className="ps-category__image" href="#">
                            <img
                                src="/static/img/categoriaspopulares/enduro.jpg"
                                alt=""
                            />
                        </a>
                        <div className="ps-category__content">
                            <a className="ps-category__name" href="#">
                                Enduro
                            </a>
                            <a className="ps-category__more" href="#">
                                More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularCategories;
