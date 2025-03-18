import React from "react";
import ContainerHome from "~/components/layouts/ContainerHome";
import HomeSevenTopBanner from "~/components/partials/homepages/home-7/HomeSevenTopBanner";


const HomeSixScreen = (props) => {
    const { setSelectedForm } = props;

    return (
        <ContainerHome title="Homepage 7">
            <main id="homepage-seven" className="ps-home--7">
                <HomeSevenTopBanner setSelectedForm={setSelectedForm} />
            </main>
        </ContainerHome>
    );
};

/*
<Card style={{ width: "18rem" }}>
                    <Card.Img
                        variant="top"
                        src="https://picsum.photos/100/100"
                    />
                    <Card.Body>
                        <Card.Title onClick={prueba} >Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
*/

export default HomeSixScreen;
