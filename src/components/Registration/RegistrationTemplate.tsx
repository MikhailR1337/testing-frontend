import React from 'react';
import classnames from 'classnames';
import { NewUserStatus, Role } from '../Header/HeaderBehaviour';
import { FormValuesCompany, FormValuesApplicant } from './RegistrationBehaviour';
import './Registration.scss';

interface Props {
    role: Role,
    formValuesCompany: FormValuesCompany,
    formValuesApplicant: FormValuesApplicant,
    setRoleHandler: (role: Role) => void;
    valueCompanyHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    valueApplicantHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: any) => void;
    setNewUserStatus: (status: NewUserStatus) => void;
}

const ROOT_CLASS = 'registration';

export function RegistrationTemplate({
    role,
    formValuesCompany,
    formValuesApplicant,
    setRoleHandler,
    valueCompanyHandler,
    valueApplicantHandler,
    onSubmit,
    setNewUserStatus,
}: Props) {
    const companyButtonClassNames = classnames(`${ROOT_CLASS}__popup-role-button`, {
        [`${ROOT_CLASS}__popup-role-button_active`]: role === Role.COMPANY,
    });
    const applicantButtonClassNames = classnames(`${ROOT_CLASS}__popup-role-button`, {
        [`${ROOT_CLASS}__popup-role-button_active`]: role === Role.APPLICANT,
    });

    const {
        company,
        login: companyLogin,
        password: companyPassword,
    } = formValuesCompany;
    const {
        firstName,
        lastName,
        login: applicantLogin,
        password: applicantPassword
    } = formValuesApplicant;

    return (
        <>
            <div className={`${ROOT_CLASS}__background`} />
            <div className={`${ROOT_CLASS}__popup-wrapper`}>
                <div
                    onClick={() => setNewUserStatus(NewUserStatus.INIT)}
                    className={`${ROOT_CLASS}__popup-close`}
                >
                    X
                </div>
                <div className={`${ROOT_CLASS}__popup-role-wrapper`}>
                    <div
                        onClick={() => setRoleHandler(Role.APPLICANT)}
                        className={applicantButtonClassNames}
                    >
                        Соискатель
                    </div>
                    <div
                        onClick={() => setRoleHandler(Role.COMPANY)}
                        className={companyButtonClassNames}
                    >
                        Компания
                    </div>
                </div>
                {role === Role.COMPANY
                    && (
                        <form
                            onSubmit={onSubmit}
                            className={`${ROOT_CLASS}__popup-form`}
                        >
                            <input
                                onChange={(e) => valueCompanyHandler(e)}
                                className={`${ROOT_CLASS}__popup-form-input`}
                                name='company'
                                type='text'
                                placeholder='Компания'
                                value={company}
                            />
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
                            <input
                                className={`${ROOT_CLASS}__popup-form-submit`}
                                type='submit'
                                value='Зарегистрироваться'
                            />
                        </form>
                    )
                }
                {role === Role.APPLICANT
                    && (
                        <form
                            onSubmit={onSubmit}
                            className={`${ROOT_CLASS}__popup-form`}
                        >
                            <input
                                onChange={(e) => valueApplicantHandler(e)}
                                className={`${ROOT_CLASS}__popup-form-input`}
                                name='firstName'
                                type='text'
                                placeholder='Имя'
                                value={firstName}
                            />
                            <input
                                onChange={(e) => valueApplicantHandler(e)}
                                className={`${ROOT_CLASS}__popup-form-input`}
                                name='lastName'
                                type='text'
                                placeholder='Фамилия'
                                value={lastName}
                            />
                            <input
                                onChange={(e) => valueApplicantHandler(e)}
                                className={`${ROOT_CLASS}__popup-form-input`}
                                name='login'
                                type='text'
                                placeholder='Логин'
                                value={applicantLogin}
                            />
                            <input
                                onChange={(e) => valueApplicantHandler(e)}
                                className={`${ROOT_CLASS}__popup-form-input`}
                                name='password'
                                type='password'
                                placeholder='Пароль'
                                value={applicantPassword}
                            />
                            <input
                                className={`${ROOT_CLASS}__popup-form-submit`}
                                type='submit'
                                value='Зарегистрироваться'
                            />
                        </form>
                    )
                }
            </div>
        </>
    )
}
