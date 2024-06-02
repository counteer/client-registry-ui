export interface Client {
    id: number|null;
    name: string;
    mothers_name?: string;
    birth_date?: string;
    birth_place?: string;
    email_address?: string;
    social_security_number?: string;
    phone_numbers: PhoneNumber[];
    addresses: Address[];
}

export interface PhoneNumber {
    id: number,
    phone_number: string
}

export interface Address {
    id: number;
    city?: string;
    postal_code?: string;
    street_address?: string;
}
