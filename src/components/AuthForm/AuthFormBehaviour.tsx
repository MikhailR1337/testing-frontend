import React, { useState } from 'react';

import { AuthFormTemplate } from './AuthFormTemplate';
import { serviceApi, ApiActions } from '../../api';
import { Role, NewUserStatus } from '../../types';

interface Props {
    userRole: Role;
    setUserRole: (status: Role) => void;
}

export interface FormValuesCompany {
    name: string;
    login: string;
    password: string;
}

export interface FormValuesCandidate {
    personalKey: string;
}

export function AuthFormBehaviour({
    userRole,
    setUserRole,
}: Props) {
    const [newUserStatus, setNewUserStatus] = useState(NewUserStatus.INIT);
    const [FormValuesCompany, setFormValuesCompany] = useState({
        name: '',
        login: '',
        password: '',
    })
    const [FormValuesCandidate, setFormValuesCandidate] = useState({
        personalKey: '',
    })

    const valueCompanyHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValuesCompany({ ...FormValuesCompany, [name]: value });
    }

    const valueCandidateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValuesCandidate({ ...FormValuesCandidate, [name]: value });
    }

    const newUserStatusHandler = (newUserStatus: NewUserStatus) => {
        setNewUserStatus(newUserStatus);
        setFormValuesCompany({
            name: '',
            login: '',
            password: '',
        })
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>, action: ApiActions) => {
        event.preventDefault();

        let body: string;
        switch (action) {
            case (ApiActions.LOGIN_CANDIDATE): {
                const candidateBody = { ...FormValuesCandidate, role: Role.AUTH_CANDIDATE };
                body = JSON.stringify(candidateBody);
                break;
            }
            case (ApiActions.LOGIN_COMPANY): {
                const { login, password } = FormValuesCompany;
                const companyBody = { login, password, role: Role.AUTH_COMPANY };
                body = JSON.stringify(companyBody);
                break;
            }
            case (ApiActions.REGISTRATION_COMPANY): {
                body = JSON.stringify(FormValuesCompany);
                break;
            }
            default:
                throw new Error('Unknown action');
        }

        const response: any = await fetch(serviceApi[action], {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let data;
        if (response.ok) {
            data = await response.json();
        }
        if (data.role === Role.AUTH_CANDIDATE) {
            setUserRole(Role.AUTH_CANDIDATE);
        }
        if (data.role === Role.AUTH_COMPANY) {
            setUserRole(Role.AUTH_COMPANY);
        }
    }

    return (
        <AuthFormTemplate
            FormValuesCandidate={FormValuesCandidate}
            formValuesCompany={FormValuesCompany}
            userRole={userRole}
            newUserStatus={newUserStatus}
            valueCandidateHandler={valueCandidateHandler}
            valueCompanyHandler={valueCompanyHandler}
            onSubmit={onSubmit}
            setUserRole={setUserRole}
            newUserStatusHandler={newUserStatusHandler}
        />
    )
}
