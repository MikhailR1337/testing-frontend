import React from 'react';

import { NewUserStatus } from './HeaderBehaviour';
import { SignIn } from '../SignIn';
import './Header.scss';
import { Registration } from '../Registration';

interface Props {
    newUserStatus: NewUserStatus;
    setNewUserStatus: (status: NewUserStatus) => void;
}

const ROOT_CLASS = 'header';

export function HeaderTemplate({
    newUserStatus,
    setNewUserStatus,
}: Props) {

    return (
        <>
            <div className={ROOT_CLASS}>
                <div className={`${ROOT_CLASS}__auth-wrapper`}>
                    <div
                        onClick={() => setNewUserStatus(NewUserStatus.SIGN_IN)}
                        className={`${ROOT_CLASS}__auth-item`}
                    >
                        <span className={`${ROOT_CLASS}__auth-item-text`}>Вход в аккаунт</span>
                    </div>
                    <div className={`${ROOT_CLASS}__auth-item`}>
                        <span className={`${ROOT_CLASS}__auth-item-text`}>|</span>
                    </div>
                    <div
                        onClick={() => setNewUserStatus(NewUserStatus.REGISTRATION)}
                        className={`${ROOT_CLASS}__auth-item`}
                    >
                        <span className={`${ROOT_CLASS}__auth-item-text`}>Зарегистрироваться</span>
                    </div>
                </div>
            </div>
            {newUserStatus === NewUserStatus.SIGN_IN && (
                <SignIn 
                    setNewUserStatus={setNewUserStatus}    
                />
            )}
            {newUserStatus === NewUserStatus.REGISTRATION && (
                <Registration 
                    setNewUserStatus={setNewUserStatus}    
                />
            )}
        </>
    )
}
