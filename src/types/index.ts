// Shared TypeScript type definitions
import type { ImageMetadata } from 'astro';

export interface MenuItem {
    id: string;
    title: string;
    image: ImageMetadata;
    alt: string;
}

export interface Location {
    name: string;
    address: string;
    embedUrl: string;
    directionsUrl?: string;
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
