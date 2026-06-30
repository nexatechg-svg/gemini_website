export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface Industry {
    id: string;
    name: string;
    description: string;
}

export interface Insight {
    id: string;
    title: string;
    category: string;
    date: string;
    excerpt: string;
    content?: string;
}

export interface ContactForm {
    name: string;
    email: string;
    message: string;
}
