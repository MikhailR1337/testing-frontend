import React, { useState } from 'react';
import { RegistrationTemplate } from './RegistrationTemplate';
import { NewUserStatus, Role } from '../Header/HeaderBehaviour';

interface Props {
    setNewUserStatus: (status: NewUserStatus) => void;
}

export interface FormValuesCompany {
    name: string;
    login: string;
    password: string;
}

export interface FormValuesApplicant {
    firstName: string;
    lastName: string;
    login: string;
    password: string;
}

export function RegistrationBehaviour({
    setNewUserStatus,
}: Props) {
    const [role, setRole] = useState(Role.INIT);
    const [FormValuesCompany, setFormValuesCompany] = useState({
        name: '',
        login: '',
        password: '',
    })
    const [FormValuesApplicant, setFormValuesApplicant] = useState({
        firstName: '',
        lastName: '',
        login: '',
        password: '',
    })

    const setRoleHandler = (role: Role) => {
        if (role === Role.APPLICANT) {
            setFormValuesCompany({
                name: '',
                login: '',
                password: '',
            });
        }
        if (role === Role.COMPANY) {
            setFormValuesApplicant({
                firstName: '',
                lastName: '',
                login: '',
                password: '',
            });
        }

        setRole(role);
    }

    const valueCompanyHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValuesCompany({ ...FormValuesCompany, [name]: value });
    }

    const valueApplicantHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValuesApplicant({ ...FormValuesApplicant, [name]: value });
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(JSON.stringify(FormValuesCompany));
        const response = await fetch('http://localhost:3000/company', {
            method: 'POST',
            body: JSON.stringify(FormValuesCompany),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("RESPONSE", response);
    }

    return (
        <RegistrationTemplate
            role={role}
            formValuesCompany={FormValuesCompany}
            formValuesApplicant={FormValuesApplicant}
            setRoleHandler={setRoleHandler}
            valueCompanyHandler={valueCompanyHandler}
            valueApplicantHandler={valueApplicantHandler}
            onSubmit={onSubmit}
            setNewUserStatus={setNewUserStatus}
        />
    )
}
