// Shared TypeScript type definitions

export interface MenuItem {
    id?: string;
    title: string;
    image: string;
    alt?: string;
    order?: number;
}

export interface Location {
    name: string;
    address: string;
    embedUrl: string;
    directionsUrl?: string;
    order?: number;
}

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
    color: string;
}

export interface LayoutProps {
    title: string;
}

export interface LocationCardProps {
    name: string;
    address: string;
    embedUrl: string;
    directionsUrl?: string;
}

export interface HourRange {
    label: string;
    value: string;
}

export interface ContactContent {
    phoneNumber: string;
    phoneNumberClean?: string;
    addressLines: string[];
    hours: HourRange[];
    socialLinks: SocialLink[];
}
