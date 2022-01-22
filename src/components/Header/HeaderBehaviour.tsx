import React, { useState } from 'react';
import { HeaderTemplate } from './HeaderTemplate';

export enum NewUserStatus {
    INIT = 'init',
    SIGN_IN = 'signIn',
    REGISTRATION = 'registration',
}

export enum Role {
    INIT = 'init',
    APPLICANT = 'applicant',
    COMPANY = 'company',
}

export function HeaderBehaviour() {
    const [newUserStatus, setNewUserStatus] = useState(NewUserStatus.INIT);

    return (
        <HeaderTemplate
            newUserStatus={newUserStatus}
            setNewUserStatus={setNewUserStatus}
        />
    )
}
