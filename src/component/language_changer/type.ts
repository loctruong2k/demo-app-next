export interface LanguageType {
    icon: string;
    code: string;
    name: string;
}

export const LanguageList: LanguageType[] = [
    {
        icon: "/assets/translate/vi.png",
        code: "vi",
        name: "Việt nam"
    },
    {
        icon: "/assets/translate/en.png",
        code: "en",
        name: "English"
    },
]