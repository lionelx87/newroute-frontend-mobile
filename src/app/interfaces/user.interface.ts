export interface UserRegister {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserAuth {
    name: string;
    email: string;
    profile_photo_url: string;
    token: string;
}

export interface RequestReset {
    email: string;
}

export interface ResetPasswordToken {
    code: string;
}

export interface RequestNewPassword {
    password: string;
    password_confirmation: string;
    token: string;
}