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
    comments: Comment[];
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

interface Comment {
    user: {
        profile_photo_url;
        name: string;
    },
    message: string;
    created_at: string;
}

export interface SpotRecommended {
    name: string;
    images: string[];
    category: string;
    total: number;
}