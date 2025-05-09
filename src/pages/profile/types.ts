export interface ProfileProps {
    avatar: string;
    items: ProfileItem[];
}

interface ProfileItem {
    label: string;
    value?: string;
}
