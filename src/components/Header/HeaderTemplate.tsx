import React from 'react';

import { AuthForm } from '../AuthForm';
import { WelcomeMenu, Role } from '../../types';
import './Header.scss';

interface Props {
    userRole: Role;
    setUserRole: (status: Role) => void;
}

const ROOT_CLASS = 'header';

export function HeaderTemplate({
    userRole,
    setUserRole,
}: Props) {

    return (
        <>
            {(userRole === Role.CANDIDATE || userRole === Role.COMPANY || userRole === Role.INIT)
                && (
                    <>
                        <div className={ROOT_CLASS}>
                            <div className={`${ROOT_CLASS}__auth-wrapper`}>
                                <div
                                    onClick={() => setUserRole(Role.CANDIDATE)}
                                    className={`${ROOT_CLASS}__auth-item`}
                                >
                                    <span className={`${ROOT_CLASS}__auth-item-text`}>{WelcomeMenu.CANDIDATE}</span>
                                </div>
                                <div className={`${ROOT_CLASS}__auth-item`}>
                                    <span className={`${ROOT_CLASS}__auth-item-text`}>|</span>
                                </div>
                                <div
                                    onClick={() => setUserRole(Role.COMPANY)}
                                    className={`${ROOT_CLASS}__auth-item`}
                                >
                                    <span className={`${ROOT_CLASS}__auth-item-text`}>{WelcomeMenu.COMPANY}</span>
                                </div>
                            </div>
                        </div>
                        {userRole === Role.CANDIDATE && (
                            <AuthForm
                                userRole={userRole}
                                setUserRole={setUserRole}    
                            />
                        )}
                        {userRole === Role.COMPANY && (
                            <AuthForm
                                userRole={userRole}
                                setUserRole={setUserRole}    
                            />
                        )}
                    </>
                )
            }
            {userRole === Role.AUTH_CANDIDATE
                && (
                    <div>{userRole}</div>
                )
            }
            {userRole === Role.AUTH_COMPANY
                && (
                    <div>{userRole}</div>
                )
            }
        </>
    )
}
