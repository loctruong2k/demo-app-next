export interface TabValue {
    title: string,
    id: string,
    children: React.ReactNode
}
export interface TabList {
    data: TabValue[],
    onChange?: (value: TabValue) => void;
    onChangeIndex?: (index: number) => void;
    className?: string;
    classTabs?: string;
    classContent?: string;
}