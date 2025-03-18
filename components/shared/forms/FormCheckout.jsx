import React from "react";
import ModuleCheckoutSummary from "~/components/shared/forms/modules/ModuleCheckoutSummary";

const FormCheckout = () => {
    return (
        <form className="ps-form--checkout" action="/" method="get">
            <div className="ps-form__billings">
                <h4 className="ps-form__heading">Detalles de facturación</h4>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>
                                Nombres <sup>*</sup>
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>
                                Apellidos <sup>*</sup>
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label>Nombre Compañia (opcional)</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label>
                                Ciudad <sup>*</sup>
                            </label>
                            <select className="ps-select form-control">
                                <option value="1">Colombia</option>
                                <option value="2">Ecuador</option>
                                <option value="3">Peru</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label>
                                Dirección <sup>*</sup>
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Ingrese la dirección"
                            />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label>Codigo postal / ZIP (opcional)</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Casa, apartamento, unidad etc. (opcional)"
                            />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label>
                                Pueblo / Ciudad <sup>*</sup>
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>
                                Email <sup>*</sup>
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>
                                Teléfono <sup>*</sup>
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder=""
                            />
                        </div>
                    </div>
                    {/*<div className="col-sm-12">
                        <div className="form-group create-account">
                            <div className="ps-checkbox">
                                <input
                                    className="form-control"
                                    type="checkbox"
                                    id="createAccount"
                                    name="createAccount"
                                />
                                <label htmlFor="createAccount">
                                    Create An account
                                </label>
                            </div>
                        </div>
                    </div>*/}
                    {/*<div className="col-sm-12">
                        <div className="form-group shipping">
                            <div className="ps-checkbox">
                                <input
                                    className="form-control"
                                    type="checkbox"
                                    id="shipping"
                                    name="shipping"
                                />
                                <label htmlFor="shipping">
                                    <strong>
                                        Shipping to different Address
                                    </strong>
                                </label>
                            </div>
                        </div>
                    </div>*/}
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label>Comentarios del pedido (opcional)</label>
                            <textarea
                                className="form-control"
                                rows="6"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default FormCheckout;
