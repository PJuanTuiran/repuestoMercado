import React from "react";

const FormContact = () => {
    return (
        <div className="ps-form--contact">
            <h2 className="ps-form__title">
                Fill up the form if you have any question
            </h2>
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="ps-form__group">
                        <input
                            className="form-control ps-form__input"
                            type="text"
                            placeholder="Name and Surname"
                        />
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="ps-form__group">
                        <input
                            className="form-control ps-form__input"
                            type="email"
                            placeholder="Your E-mail"
                        />
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="ps-form__group">
                        <input
                            className="form-control ps-form__input"
                            type="text"
                            placeholder="Phone"
                        />
                    </div>
                </div>
                <div className="col-12">
                    <div className="ps-form__group">
                        <textarea
                            className="form-control ps-form__textarea"
                            rows="5"
                            placeholder="Message"></textarea>
                    </div>
                </div>
            </div>
            <div className="ps-form__submit">
                <button className="ps-btn ps-btn--warning">Send message</button>
            </div>
        </div>
    );
};

export default FormContact;
