export interface Spot {
    id: number;
    name: string;
    description: string;
    address: string;
    phones: Phone[];
    latitude: string;
    longitude: string;
    images: string[];
    priority?: {
        value: number
    }
}

interface Phone {
    number: string;
}