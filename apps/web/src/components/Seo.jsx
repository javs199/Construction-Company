import React from 'react';
import { Helmet } from 'react-helmet';
import { SITE_URL, SOCIAL_IMAGE_URL } from '@/config/site';

// Social and canonical tags; the page owns its localized title and description.
const Seo = ({ title, description, image, imageAlt, url, siteName, type = 'website' }) => {
    const socialImage = image || SOCIAL_IMAGE_URL;
    const canonical = url || SITE_URL;

    return (
        <Helmet>
            <link rel="canonical" href={canonical} />
            <meta property="og:url" content={canonical} />
            <meta property="og:type" content={type} />
            {siteName && <meta property="og:site_name" content={siteName} />}
            {title && <meta property="og:title" content={title} />}
            {description && <meta property="og:description" content={description} />}
            {socialImage && <meta property="og:image" content={socialImage} />}
            {socialImage && <meta property="og:image:width" content="1200" />}
            {socialImage && <meta property="og:image:height" content="630" />}
            {socialImage && <meta property="og:image:type" content="image/jpeg" />}
            {socialImage && imageAlt && <meta property="og:image:alt" content={imageAlt} />}
            <meta name="twitter:card" content={socialImage ? 'summary_large_image' : 'summary'} />
            {title && <meta name="twitter:title" content={title} />}
            {description && <meta name="twitter:description" content={description} />}
            {socialImage && <meta name="twitter:image" content={socialImage} />}
            {socialImage && imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
        </Helmet>
    );
}

export default Seo;

export { Seo };
