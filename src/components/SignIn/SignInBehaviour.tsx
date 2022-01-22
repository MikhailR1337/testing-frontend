import React, { useState } from 'react';
import { SignInTemplate } from './SignInTemplate';
import { NewUserStatus, Role } from '../Header/HeaderBehaviour';

interface Props {
    setNewUserStatus: (status: NewUserStatus) => void;
}

export interface FormValues {
    login: string;
    password: string;
}

export function SignInBehaviour({
    setNewUserStatus,
}: Props) {
    const [role, setRole] = useState(Role.INIT);
    const [formValues, setFormValues] = useState({
        login: '',
        password: '',
    })

    const valueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('formValues', formValues);
    }

    const setRoleHandler = (role: Role) => {
        setFormValues({
            login: '',
            password: '',
        });

        setRole(role);
    }

    return (
        <SignInTemplate
            role={role}
            formValues={formValues}
            setRoleHandler={setRoleHandler}
            valueHandler={valueHandler}
            onSubmit={onSubmit}
            setNewUserStatus={setNewUserStatus}
        />
    )
}
