import React from 'react';
import classnames from 'classnames';
import { NewUserStatus, Role } from '../Header/HeaderBehaviour';
import { FormValues } from './SignInBehaviour';
import './SignIn.scss';

interface Props {
    role: Role,
    formValues: FormValues,
    setRoleHandler: (role: Role) => void;
    valueHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: any) => void;
    setNewUserStatus: (status: NewUserStatus) => void;
}

const ROOT_CLASS = 'sing-in';

export function SignInTemplate({
    role,
    formValues,
    setRoleHandler,
    valueHandler,
    onSubmit,
    setNewUserStatus,
}: Props) {
    const companyButtonClassNames = classnames(`${ROOT_CLASS}__popup-role-button`, {
        [`${ROOT_CLASS}__popup-role-button_active`]: role === Role.COMPANY,
    });
    const applicantButtonClassNames = classnames(`${ROOT_CLASS}__popup-role-button`, {
        [`${ROOT_CLASS}__popup-role-button_active`]: role === Role.APPLICANT,
    });

    const { login, password } = formValues;

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
                {role !== Role.INIT
                    && (
                        <form
                            onSubmit={onSubmit}
                            className={`${ROOT_CLASS}__popup-form`}
                        >
                            <input
                                onChange={(e) => valueHandler(e)}
                                className={`${ROOT_CLASS}__popup-form-input`}
                                name='login'
                                type='text'
                                placeholder='Логин'
                                value={login}
                            />
                            <input
                                onChange={(e) => valueHandler(e)}
                                className={`${ROOT_CLASS}__popup-form-input`}
                                name='password'
                                type='password'
                                placeholder='Пароль'
                                value={password}
                            />
                            <input
                                className={`${ROOT_CLASS}__popup-form-submit`}
                                type='submit'
                                value='Войти'
                            />
                        </form>
                    )
                }
            </div>
        </>
    )
}
