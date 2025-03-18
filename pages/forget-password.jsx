import React from "react";
import Container from "~/components/layouts/Container";

const ForgotPasswordScreen = () => {
    return (
        <Container title="Forgot password">
            <div className="ps-page ps-page--inner ">
                <div className="container">
                    <div className="ps-page__header"></div>
                    <div className="ps-page__content ps-lost-password">
                        <div className="ps-lost-password__content">
                            <div className="ps-lost-password__text">
                                Lost your password? Please enter your username
                                or email address. You will receive a link to
                                create a new password via email.
                            </div>
                            <form action="do_action" method="post">
                                <div className="ps-form--review">
                                    <div className="ps-form__group">
                                        <label className="ps-form__label">
                                            Username or email
                                            <>h</>
                                        </label>
                                        <input
                                            className="form-control ps-form__input"
                                            type="text"
                                        />
                                    </div>
                                    <div className="ps-form__submit">
                                        <button className="ps-btn ps-btn--warning">
                                            Reset password
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ForgotPasswordScreen;
