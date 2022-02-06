import React from 'react';
import classnames from 'classnames';

import { Role, NewUserStatus } from '../../types';
import { ApiActions } from '../../api';
import { FormValuesCompany, FormValuesCandidate } from './AuthFormBehaviour';
import './AuthForm.scss';

interface Props {
    newUserRole: Role;
    FormValuesCandidate: FormValuesCandidate;
    formValuesCompany: FormValuesCompany;
    newUserStatus: NewUserStatus;
    valueCandidateHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    valueCompanyHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>, action: ApiActions) => void;
    setNewUserRole: (status: Role) => void;
    setNewUserStatus: (newUserStatus: NewUserStatus) => void;
}

const ROOT_CLASS = 'auth-form';

export function AuthFormTemplate({
    newUserRole,
    FormValuesCandidate,
    formValuesCompany,
    newUserStatus,
    valueCandidateHandler,
    valueCompanyHandler,
    onSubmit,
    setNewUserRole,
    setNewUserStatus,
}: Props) {
    const registationStatusClassNames = classnames(`${ROOT_CLASS}__popup-status-button`, {
        [`${ROOT_CLASS}__popup-status-button_active`]: newUserStatus === NewUserStatus.REGISTRATION,
    });
    const singInButtonClassNames = classnames(`${ROOT_CLASS}__popup-status-button`, {
        [`${ROOT_CLASS}__popup-status-button_active`]: newUserStatus === NewUserStatus.SIGN_IN,
    });

    const {
        name: companyName,
        login: companyLogin,
        password: companyPassword,
    } = formValuesCompany;

    const {
        personalKey,
    } = FormValuesCandidate;

    let action: ApiActions;
    if (newUserRole === Role.CANDIDATE) {
        action = ApiActions.LOGIN_CANDIDATE;
    }
    if (newUserRole === Role.COMPANY) {
        action = newUserStatus === NewUserStatus.REGISTRATION
            ? ApiActions.REGISTRATION_COMPANY
            : ApiActions.LOGIN_COMPANY;
    }

    return (
        <>
            <div className={`${ROOT_CLASS}__background`} />
            <div className={`${ROOT_CLASS}__popup-wrapper`}>
                <div
                    onClick={() => setNewUserRole(Role.INIT)}
                    className={`${ROOT_CLASS}__popup-close`}
                >
                    X
                </div>
                {newUserRole === Role.CANDIDATE
                    && (
                        <>
                            <div className={`${ROOT_CLASS}__popup-status-wrapper`}>
                                <div
                                    className={`${ROOT_CLASS}__popup-status-info`}
                                >
                                    {NewUserStatus.SIGN_IN}
                                </div>
                            </div>
                            <form
                                onSubmit={(event) => onSubmit(event, action)}
                                className={`${ROOT_CLASS}__popup-form`}
                            >
                                <input
                                    onChange={(e) => valueCandidateHandler(e)}
                                    className={`${ROOT_CLASS}__popup-form-input`}
                                    name='personalKey'
                                    type='text'
                                    placeholder='Введите полученный код'
                                    value={personalKey}
                                />
                                <input
                                    className={`${ROOT_CLASS}__popup-form-submit`}
                                    type='submit'
                                    value='Войти'
                                />
                            </form>
                    </>
                    )
                }
                {newUserRole === Role.COMPANY
                    && (
                        <>
                            <div className={`${ROOT_CLASS}__popup-status-wrapper`}>
                                    <div
                                        onClick={() => setNewUserStatus(NewUserStatus.SIGN_IN)}
                                        className={singInButtonClassNames}
                                    >
                                        {NewUserStatus.SIGN_IN}
                                    </div>
                                    <div
                                        onClick={() => setNewUserStatus(NewUserStatus.REGISTRATION)}
                                        className={registationStatusClassNames}
                                    >
                                        {NewUserStatus.REGISTRATION}
                                    </div>
                            </div>
                            {newUserStatus !== NewUserStatus.INIT
                                && (
                                    <form
                                        onSubmit={(event) => onSubmit(event, action)}
                                        className={`${ROOT_CLASS}__popup-form`}
                                    >
                                    {newUserStatus === NewUserStatus.REGISTRATION
                                        && (
                                            <input
                                                onChange={(e) => valueCompanyHandler(e)}
                                                className={`${ROOT_CLASS}__popup-form-input`}
                                                name='name'
                                                type='text'
                                                placeholder='Название'
                                                value={companyName}
                                            />
                                        )}
                                        <input
                                            onChange={(e) => valueCompanyHandler(e)}
                                            className={`${ROOT_CLASS}__popup-form-input`}
                                            name='login'
                                            type='text'
                                            placeholder='Логин'
                                            value={companyLogin}
                                        />
                                        <input
                                            onChange={(e) => valueCompanyHandler(e)}
                                            className={`${ROOT_CLASS}__popup-form-input`}
                                            name='password'
                                            type='password'
                                            placeholder='Пароль'
                                            value={companyPassword}
                                        />
                                        {newUserStatus === NewUserStatus.REGISTRATION
                                            && (
                                                <input
                                                className={`${ROOT_CLASS}__popup-form-submit`}
                                                type='submit'
                                                value='Зарегистрироваться'
                                            />
                                        )}
                                        {newUserStatus === NewUserStatus.SIGN_IN
                                            && (
                                                <input
                                                className={`${ROOT_CLASS}__popup-form-submit`}
                                                type='submit'
                                                value='Войти'
                                            />
                                        )}
                                    </form>
                                )
                            }
                        </>
                    )
                }
            </div>
        </>
    )
}
