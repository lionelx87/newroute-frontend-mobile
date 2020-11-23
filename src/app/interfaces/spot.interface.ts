export interface Spot {
    id: number;
    name: string;
    description: string;
    address: string;
    phones: Phone[];
    latitude: string;
    longitude: string;
    images: string[];
    valoration: Valoration;
    priority?: {
        value: number
    }
}

interface Phone {
    number: string;
}

interface Valoration {
    users: number;
    rating: number;
}