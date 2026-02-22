export interface ProductData {
    id: number;
    name: string;
    image_url: string;
    available: boolean;
    description: string;
    external_link: string;
    image: string;
    is_liked: boolean;
    next_item: {id: number; name: string} | null;
    previous_item: {id: number, name:string } | null;
    price: string;
    source: string;
    stock: number;
}
