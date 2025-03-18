import { all } from "redux-saga/effects";

import AppSaga from "./app/saga";
import ShopSaga from "./shop/saga";
import Ecomerce from "./ecomerce/saga";
import Categories from "./categories/saga";
import Homepages from "./homepages/saga";
import Typesidentifications from "./typesidentifications/saga";
import UserSaga from "./userlogged/saga";
import TypesVehiclesSaga from "./typesvehicles/saga";
import VehiclesBrandsSaga from "./vehiclesbrands/saga";
import YearsVehiclesSaga from "./yearsvehicles/saga";
import ModelsVehiclesSaga from "./modelsvehicles/saga";
import BodiesVehiclesSaga from "./bodiesvehicles/saga";
import UsersSaga from "./users/saga";
import TokenRegistroSaga from "./tokenregistro/saga";
import VersionMotorSaga from "./versionmotor/saga";
import DatosMotorSaga from "./datosmotor/saga";
import VehiculoSeleccionadoSaga from "./selectedvehicle/saga";
import DatosProductoSaga from "./datosproducto/saga";
import DatosProductoUnoSaga from "./datosproductouno/saga";
import UbicarProducto from "./ubicarproducto/saga";
import VariablesGeneralesMrp from "./variablesgeneralesmrp/saga";
import DataSearchInteractive from "./datasearchinteractive/saga";
import DataSelectedExternal from "./dataselectedexternal/saga";
import SelectViewProduct from "./selectviewproduct/saga";
import DataFindProducts from "./datafindproducts/saga";
import DatosGenerales from "./datosgenerales/saga";
import DatosNewModels from "./datanewmodels/saga";
import DatosNewCylinder from "./datanewcylinder/saga";
import DatosEditar from "./editdata/saga";
import DatosEditarBuscar from "./editdatafind/saga";
import DataSelectSearch from "./dataselectsearch/saga";
import WordBase from "./wordbase/saga";
import WishList from "./datawishlist/saga";
import DataCityPrd from "./datacityprd/saga";
import CitySelect from "./cityselect/saga";
import SelectCondition from "./selectcondition/saga";
import RangosPrecio from "./rangosprecio/saga";
import DataShoppingCart from "./datashoppingcart/saga";
import AddEdToCart from "./addedtocart/saga";
import ChangeSaga from "./changesearch/saga";
import ChangeSagaPrice from "./changesearchprice/saga";
import ClearLocation from "./clearlocation/saga";
import ClearCondition from "./clearcondition/saga";
import LeeIra from "./leeira/saga";
import AddLogin from "./addlogin/saga";
import BlockScreen from "./blockscreen/saga";
import CancelCondition from "./cancelcondition/saga";
import DuplicarPrd from "./duplicarprd/saga";
import UserMenu from "./usermenu/saga";
import UserMenuPrimary from "./usermenuprimary/saga";
import Retornar from "./return/saga";
import CloseMenu from "./closemenu/saga";
import ItemComprar from "./itemcomprar/saga";
import FilterGarage from "./filtergarage/saga";
import ItemSelectGarage from "./itemselectgarage/saga";
import DeleteItem from "./deleteitem/saga";
import SelectItem from "./selectitem/saga";
import VehiculosGarage from "./vehiculosgarage/saga";
import CloseGarage from "./closegarage/saga";
import ResetInput from "./resetinput/saga";
import SelectedAddress from "./selectedaddress/saga";
import MenuPublication from "./menupublication/saga";
import NumberPages from "./numberpages/saga";
import PageSelect from "./pageselect/saga";
import OpenCloseCity from "./openclosecity/saga";
import GripSelect from "./gripselect/saga";
import NumberPrdSelect from "./numberprdselect/saga";
import FiltroPrd from "./filtroprd/saga";
import FiltroCondicionPrd from "./filtrocondicionprd/saga";
import FiltroOrderByPrd from "./filtroorderbyprd/saga";
import RefreshPage from "./refreshpage/saga";
import CtlrNotificacion from "./ctlrnotificacion/saga";
import ControlAcceso from "./controlacceso/saga";
import LongPage from "./longpage/saga";
import ViewSearch from "./viewsearch/saga";
import SelectViewPrd from "./selectviewprd/saga";
import ViewCheckout from "./viewcheckout/saga";
import ViewCategorias from "./ctlrinput/saga";
import CambioDireccion from "./cambiodireccion/saga";

export default function* rootSaga() {
    yield all([AppSaga(), ShopSaga(), Ecomerce(), Categories(), Homepages(), Typesidentifications(), UserSaga(),
               TypesVehiclesSaga(), VehiclesBrandsSaga(), YearsVehiclesSaga(), ModelsVehiclesSaga(), BodiesVehiclesSaga(),
               UsersSaga(), TokenRegistroSaga(), VersionMotorSaga(), DatosMotorSaga(), VehiculoSeleccionadoSaga(),
               DatosProductoSaga(), DatosProductoUnoSaga(), UbicarProducto(), VariablesGeneralesMrp(), DataSearchInteractive(),
               DataSelectedExternal(), SelectViewProduct(), DataFindProducts(), DatosGenerales(), DatosNewModels(),
               DatosNewCylinder(), DatosEditar(), DatosEditarBuscar(), DataSelectSearch(), WordBase(), WishList(),
               DataCityPrd(), CitySelect(), SelectCondition(), RangosPrecio(), DataShoppingCart(), AddEdToCart(),
               ChangeSaga(), ChangeSagaPrice(), ClearLocation(), ClearCondition(), LeeIra(), AddLogin(), BlockScreen(),
               CancelCondition(), DuplicarPrd(), UserMenu(), UserMenuPrimary(), Retornar(), CloseMenu(), ItemComprar(),
               FilterGarage(), ItemSelectGarage(), DeleteItem(), SelectItem(), VehiculosGarage(), CloseGarage(),
               ResetInput(), SelectedAddress(), MenuPublication(), NumberPages(), PageSelect(), OpenCloseCity(),
               GripSelect(), NumberPrdSelect(), FiltroPrd(), FiltroCondicionPrd(), FiltroOrderByPrd(), RefreshPage(),
               CtlrNotificacion(), ControlAcceso(), LongPage(), ViewSearch(), SelectViewPrd(), ViewCheckout(),
               ViewCategorias(), CambioDireccion()
        ]);
}
