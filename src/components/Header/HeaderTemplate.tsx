import React from 'react';
import './Header.scss';

const ROOT_CLASS = 'header';

export function HeaderTemplate() {
    return (
        <div className={ROOT_CLASS}>
            <div className={`${ROOT_CLASS}__auth-wrapper`}>
                <div className={`${ROOT_CLASS}__auth-item`}>
                    <span className={`${ROOT_CLASS}__auth-item-text`}>Вход в аккаунт</span>
                </div>
                <div className={`${ROOT_CLASS}__auth-item`}>
                    <span className={`${ROOT_CLASS}__auth-item-text`}>|</span>
                </div>
                <div className={`${ROOT_CLASS}__auth-item`}>
                    <span className={`${ROOT_CLASS}__auth-item-text`}>Зарегистрироваться</span>
                </div>
            </div>
        </div>
    )
}
