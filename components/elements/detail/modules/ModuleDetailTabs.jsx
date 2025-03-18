import React, { useState, useEffect } from "react";
import ModuleDetailDescription from "~/components/elements/detail/modules/ModuleDetailDescription";
import ModuleAdditionInformation from "~/components/elements/detail/modules/ModuleDetailAdditionInformation";
import ModuleDetailSpecification from "~/components/elements/detail/modules/ModuleDetailSpecification";
import ModuleDetailReviews from "~/components/elements/detail/modules/ModuleDetailReviews";
import ModuleDetailSeller from "~/components/elements/detail/modules/ModuleDetailSeller";
import ModuleDetailQuestion from "~/components/elements/detail/modules/ModuleDetailQuestion";
import ModuleQualificationPrd from "~/components/elements/detail/modules/ModuleQualificationPrd";

import { Tabs } from "antd";

const { TabPane } = Tabs;
const ModuleDetailTabs = ({ product }) => {
    const [ubicarEn, setUbicarEn] = useState("1");

    return (
        <Tabs defaultActiveKey={ubicarEn} className="ps-product__tabs mt-140">
            <TabPane className="tamañofuentetab" tab="Descripción" key="1">
                <ModuleDetailDescription product={product} />
            </TabPane>
            <TabPane
                className="tamañofuentetab"
                tab="Información adicional"
                key="2">
                <ModuleAdditionInformation product={product} />
            </TabPane>
            <TabPane
                className="tamañofuentetab"
                tab="Información vendedor"
                key="3">
                <ModuleDetailSeller 
                    product={product} 
                />
            </TabPane>
            <TabPane className="tamañofuentetab" tab="Preguntas" key="4">
                <ModuleDetailQuestion product={product} />
            </TabPane>
            <TabPane
                className="tamañofuentetab"
                tab="Calificación producto"
                key="5">
                <ModuleQualificationPrd 
                    product={product}
                />
            </TabPane>
        </Tabs>
    );
};

export default ModuleDetailTabs;
