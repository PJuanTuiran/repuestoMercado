import React from "react";
import Container from "~/components/layouts/Container";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import SkeletonTable from "~/components/elements/skeletons/SkeletonTable";

const HomeDefaultPage = () => {
    return (
        <Container title="Skeletons">
            <section className="ps-skeletons ps-section--standard pt-100 pb-100">
                <div className="container">
                    <div className="ps-section__header">
                        <h3>Skeletons</h3>
                    </div>
                    <div className="ps-section__content">
                        <div className="row">
                            <div className="col-md-3">
                                <h4>Product grid</h4>
                                <SkeletonProduct />
                                <SkeletonProduct type="list-small" />
                                <SkeletonProduct type="list-small" />
                                <SkeletonProduct type="list-small" />
                                <SkeletonProduct type="list-small" />
                            </div>
                            <div className="col-md-9">
                                <h4>Product List</h4>
                                <SkeletonProduct type="list" />
                            </div>
                            <div className="col-md-12">
                                <h4>Table</h4>
                                <SkeletonTable />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    );
};

export default HomeDefaultPage;
