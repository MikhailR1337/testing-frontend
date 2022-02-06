import React, { useState } from 'react';

import { AuthFormTemplate } from './AuthFormTemplate';
import { serviceApi, ApiActions } from '../../api';
import { Role, NewUserStatus } from '../../types';

interface Props {
    newUserRole: Role;
    setNewUserRole: (status: Role) => void;
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
    newUserRole,
    setNewUserRole,
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
                body = JSON.stringify(FormValuesCandidate);
                break;
            }
            case (ApiActions.LOGIN_COMPANY): {
                const { login, password } = FormValuesCompany;

                body = JSON.stringify({ login, password });
                break;
            }
            case (ApiActions.REGISTRATION_COMPANY): {
                body = JSON.stringify(FormValuesCompany);
                break;
            }
            default:
                throw new Error('Unknown action');
        }

        await fetch(serviceApi[action], {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return (
        <AuthFormTemplate
            FormValuesCandidate={FormValuesCandidate}
            formValuesCompany={FormValuesCompany}
            newUserRole={newUserRole}
            newUserStatus={newUserStatus}
            valueCandidateHandler={valueCandidateHandler}
            valueCompanyHandler={valueCompanyHandler}
            onSubmit={onSubmit}
            setNewUserRole={setNewUserRole}
            newUserStatusHandler={newUserStatusHandler}
        />
    )
}
