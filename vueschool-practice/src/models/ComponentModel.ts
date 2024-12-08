export interface ComponentModel {
    id: string;
    componentType: string;
    order: number;
    defaultLanguage: string;
    content: {
        vi: string;
        ko: string;
        en: string;
    };
    listType?: string;
    options: {
       
        vi: string;
        ko: string;
        en: string;
    }[]
}

export interface PageModel {
    id: string;
    contents: ComponentModel[];
}