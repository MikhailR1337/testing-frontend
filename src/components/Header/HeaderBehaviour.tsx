import React, { useState } from 'react';

import { HeaderTemplate } from './HeaderTemplate';
import { Role } from '../../types';


export function HeaderBehaviour() {
    const [newUserRole, setNewUserRole] = useState(Role.INIT);

    return (
        <HeaderTemplate
            newUserRole={newUserRole}
            setNewUserRole={setNewUserRole}
        />
    )
}
