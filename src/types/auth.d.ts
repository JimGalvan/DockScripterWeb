export interface UserDto {
    email: string;
    password: string;
}

export interface UserResponseDto {
    id: string;
    email: string;
}

export interface LoginResponse {
    token: string;
}
