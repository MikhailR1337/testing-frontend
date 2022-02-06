import React, { useState } from 'react';

import { HeaderTemplate } from './HeaderTemplate';
import { Role } from '../../types';


export function HeaderBehaviour() {
    const [userRole, setUserRole] = useState(Role.INIT);

    return (
        <HeaderTemplate
            userRole={userRole}
            setUserRole={setUserRole}
        />
    )
}
