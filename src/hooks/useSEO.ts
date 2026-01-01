import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    url?: string;
    image?: string;
}

export const useSEO = ({ title, description, url, image }: SEOProps) => {
    useEffect(() => {
        // 1. Update Title
        document.title = title;

        // 2. Helper function to update/create meta tags
        const setMetaTag = (attr: string, key: string, content: string) => {
            if (!content) return;
            let element = document.querySelector(`meta[${attr}="${key}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attr, key);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // 3. Update Standard Meta Tags
        setMetaTag('name', 'description', description);
        setMetaTag('link', 'canonical', url || window.location.href);

        // 4. Update Open Graph (Facebook/LinkedIn)
        setMetaTag('property', 'og:title', title);
        setMetaTag('property', 'og:description', description);
        setMetaTag('property', 'og:url', url || window.location.href);
        if (image) setMetaTag('property', 'og:image', image);

        // 5. Update Twitter Cards
        setMetaTag('name', 'twitter:title', title);
        setMetaTag('name', 'twitter:description', description);
        if (image) setMetaTag('name', 'twitter:image', image);

    }, [title, description, url, image]);
};