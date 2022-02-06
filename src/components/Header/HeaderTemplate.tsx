import React from 'react';

import { AuthForm } from '../AuthForm';
import { WelcomeMenu, Role } from '../../types';
import './Header.scss';

interface Props {
    newUserRole: Role;
    setNewUserRole: (status: Role) => void;
}

const ROOT_CLASS = 'header';

export function HeaderTemplate({
    newUserRole,
    setNewUserRole,
}: Props) {

    return (
        <>
            <div className={ROOT_CLASS}>
                <div className={`${ROOT_CLASS}__auth-wrapper`}>
                    <div
                        onClick={() => setNewUserRole(Role.CANDIDATE)}
                        className={`${ROOT_CLASS}__auth-item`}
                    >
                        <span className={`${ROOT_CLASS}__auth-item-text`}>{WelcomeMenu.CANDIDATE}</span>
                    </div>
                    <div className={`${ROOT_CLASS}__auth-item`}>
                        <span className={`${ROOT_CLASS}__auth-item-text`}>|</span>
                    </div>
                    <div
                        onClick={() => setNewUserRole(Role.COMPANY)}
                        className={`${ROOT_CLASS}__auth-item`}
                    >
                        <span className={`${ROOT_CLASS}__auth-item-text`}>{WelcomeMenu.COMPANY}</span>
                    </div>
                </div>
            </div>
            {newUserRole === Role.CANDIDATE && (
                <AuthForm
                    newUserRole={newUserRole}
                    setNewUserRole={setNewUserRole}    
                />
            )}
            {newUserRole === Role.COMPANY && (
                <AuthForm
                    newUserRole={newUserRole}
                    setNewUserRole={setNewUserRole}    
                />
            )}
        </>
    )
}
