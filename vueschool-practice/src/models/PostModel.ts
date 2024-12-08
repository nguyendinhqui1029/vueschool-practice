export interface PostSessionRequestBody {
    idMenu: string;
    componentType: string;
    order: number;
    defaultLanguage: string;
    vi: string;
    ko: string;
    en: string;
}

export interface UpdateSessionRequestBody {
    defaultLanguage: string;
    vi: string;
    ko: string;
    en: string;
}

export interface PostSessionResponseValue {
    id: string;
    idMenu: string;
    componentType: string;
    order: number;
    defaultLanguage: string;
    vi: string;
    ko: string;
    en: string;
}