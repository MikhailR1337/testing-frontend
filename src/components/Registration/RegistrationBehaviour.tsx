import React, { useState } from 'react';
import { RegistrationTemplate } from './RegistrationTemplate';
import { NewUserStatus, Role } from '../Header/HeaderBehaviour';

interface Props {
    setNewUserStatus: (status: NewUserStatus) => void;
}

export interface FormValuesCompany {
    company: string;
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
        company: '',
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
                company: '',
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

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('formValues', FormValuesCompany, FormValuesApplicant);
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
