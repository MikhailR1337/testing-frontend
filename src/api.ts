export const serviceApi = {
    loginCompany: 'http://localhost:3000/company/login',
    registrationCompany: 'http://localhost:3000/company/registration',
    loginCandidate: 'http://localhost:3000/candidate/login',
}

export enum ApiActions {
    LOGIN_COMPANY = 'loginCompany',
    REGISTRATION_COMPANY = 'registrationCompany',
    LOGIN_CANDIDATE = 'loginCandidate',
}
