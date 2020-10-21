export interface Spot {
    id: number;
    name: string;
    description: string;
    address: string;
    latitude: string;
    longitude: string;
    images: string[];
    priority?: {
        value: number
    }
}