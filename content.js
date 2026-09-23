/*
  EDIT THIS FILE FIRST.

  CATEGORY COVER
  `cover` belongs only to the category card on the homepage. It is deliberately
  separate from every project cover and project image.

  PROJECT TEMPLATE
  Every project uses the same fields:
  - cover: card image shown inside the category
  - image1, image2, image3: three large images shown on the project page
  - title, company, slug, sector and summary: the case-study information

  Replace the sample paths and text directly. Keep every slug unique inside its
  category and run `node tools/generate-pages.mjs` after changing a slug.
*/

const portfolioProject = ({ title, company, slug, sector, summary, cover, image1, image2, image3 }) => ({
  title,
  company,
  slug,
  sector,
  summary,
  coverSrc: cover,
  src: image1,
  gallery: [
    { src: image2, alt: `${title} — project detail 02` },
    { src: image3, alt: `${title} — project detail 03` }
  ],
  position: 'center',
  fit: 'contain'
});

window.SITE_CONTENT = {
  brand: {
    name: '2 Percent',
    logo: 'images/site/studio-logo.svg',
    email: 'design@2pctstudio.com'
  },
  categories: {
    branding: {
      index: '01 / 06',
      title: 'Brand & Identity',
          companies: ["Al Shira'aa", 'Innosoft', 'hfp', 'Equicore Group', 'Night of the Angels', 'FONTE Drinks'],
      lead: 'We help businesses become more recognisable, consistent and easier to trust across every customer touchpoint.',
      capabilities: ['Brand strategy & positioning', 'Visual identity systems', 'Art direction', 'Brand guidelines & rollout'],
          cover: { src: 'images/category-covers/branding.webp', alt: 'Brand & Identity category cover', position: 'center', fit: 'cover' },
      rows: [2, 1, 2],
      images: [
        portfolioProject({
          title: "Al Shira'aa", company: "Al Shira'aa", slug: 'al-shiraa',
          sector: 'Equestrian Sport · Horse Breeding · International Events',
          summary: "From Al Shira'aa to Al Shira'aa Farms and Al Shira'aa Tour, we led the visual evolution of a unified equestrian brand system—creating a consistent and recognisable identity across international events and every brand touchpoint.",
          cover: 'images/branding/al-shiraa-cover.webp',
            image1: 'images/branding/al-shiraa-01.webp',
            image2: 'images/branding/al-shiraa-03.webp',
            image3: 'images/branding/al-shiraa-02.webp'
        }),
        portfolioProject({
          title: 'Innosoft', company: 'Innosoft', slug: 'restaurant-identity',
          sector: 'Telecommunications · AI',
          summary: 'A forward-looking product identity for Innosoft’s AI telephone assistant, combining intelligent communication, seamless connectivity and a clear connection to the established Innosoft brand.',
          cover: 'images/branding/02.svg', image1: 'images/branding/02.svg', image2: 'images/branding/02.svg', image3: 'images/branding/02.svg'
        }),
        portfolioProject({
          title: 'hfp — Created for impact', company: 'hfp — Created for impact', slug: 'premium-service-rebrand',
          sector: 'Consulting · Corporate Strategy',
            summary: 'Developing hfp established visual identity across editorial publications, certificates and complex corporate communication materials, with a strong focus on clarity, consistency and professional presentation.',
          cover: 'images/branding/03.svg', image1: 'images/branding/03.svg', image2: 'images/branding/03.svg', image3: 'images/branding/03.svg'
        }),
        portfolioProject({
            title: 'Equicore Group', company: 'Equicore Group', slug: 'consumer-brand-system',
            sector: 'Equestrian Sport & Events',
            summary: 'A bold and refined identity for a multidisciplinary equestrian group operating across events, construction and professional equine services in the UAE. The visual direction brings together sporting prestige, structural expertise and the ambition to deliver world-class equestrian experiences.',
          cover: 'images/branding/04.svg', image1: 'images/branding/04.svg', image2: 'images/branding/04.svg', image3: 'images/branding/04.svg'
        }),
        portfolioProject({
            title: 'Night of the Angels', company: 'Night of the Angels', slug: 'cultural-brand-identity',
            sector: 'Charity & Social Impact',
            summary: 'A heartfelt brand identity created for Night of the Angels, a Bulgarian charitable foundation bringing together people, businesses and volunteers in support of life-changing causes. The visual direction balances warmth, hope and emotional connection, giving the initiative a recognisable identity that can unite its community across campaigns and events.',
            cover: 'images/branding/noa-cover.webp', image1: 'images/branding/noa-01.webp', image2: 'images/branding/noa-02.webp', image3: 'images/branding/noa-03.webp'
        }),
        portfolioProject({
            title: 'FONTE Drinks', company: 'FONTE Drinks', slug: 'corporate-identity-refresh',
            sector: 'Food & Beverage',
            summary: 'A vibrant brand communication project for FONTE Handcrafted Blends, a producer of next-generation café beverages served across more than 35 countries. The design introduces an expanding product range through bold colour, clear organisation and an energetic visual language that reflects the natural ingredients and distinctive character of every blend.',
          cover: 'images/branding/06.svg', image1: 'images/branding/06.svg', image2: 'images/branding/06.svg', image3: 'images/branding/06.svg'
        })
      ]
    },

    campaigns: {
      index: '02 / 06',
      title: 'Campaigns & Content',
        companies: ['EasyFirma 3', 'Al Shira’aa Tour', 'Katja Holzhey', 'iGold'],
      lead: 'We turn important messages into focused visual ideas that earn attention and stay coherent across every channel.',
      capabilities: ['Creative direction', 'Key visuals & campaign systems', 'Social media & paid advertising', 'Outdoor graphics & vehicle wraps'],
      cover: { src: 'images/category-covers/campaigns.webp', alt: 'Campaigns & Content category cover', position: 'center', fit: 'cover' },
      rows: [1, 2, 2],
      images: [
        portfolioProject({
            title: 'EasyFirma 3', company: 'EasyFirma 3', slug: 'live-entertainment-campaign',
            sector: 'Business Software',
            summary: 'A clear and approachable product campaign for EasyFirma 3, an invoicing and business management solution created for small companies, freelancers and tradespeople across the DACH region. The campaign translates different software versions and upgrade paths into simple, accessible visuals that help users quickly understand the right next step for their business.',
          cover: 'images/campaigns/01.svg', image1: 'images/campaigns/01.svg', image2: 'images/campaigns/01.svg', image3: 'images/campaigns/01.svg'
        }),
        portfolioProject({
            title: 'Al Shira’aa Tour', company: 'Al Shira’aa Tour', slug: 'musical-key-visual',
            sector: 'Equestrian Sport & Events',
            summary: 'A large-scale visual campaign developed for the Al Shira’aa Tour, bringing together international show jumping events under one coherent communication system. The work spans event promotion, digital content and large-format applications, maintaining a premium and recognisable presence across multiple venues, formats and audiences.',
          cover: 'images/campaigns/02.svg', image1: 'images/campaigns/02.svg', image2: 'images/campaigns/02.svg', image3: 'images/campaigns/02.svg'
        }),
        portfolioProject({
            title: 'Katja Holzhey', company: 'Katja Holzhey', slug: 'tour-announcement-campaign',
            sector: 'Business Consulting & Mentoring',
            summary: 'A content-led campaign developed for Katja Holzhey and Holzhey-Consulting, promoting a business mentoring programme focused on efficient processes, stronger teams and greater entrepreneurial freedom. The campaign translates complex consulting topics into a series of clear, engaging and visually consistent content cards.',
          cover: 'images/campaigns/03.svg', image1: 'images/campaigns/03.svg', image2: 'images/campaigns/03.svg', image3: 'images/campaigns/03.svg'
        }),
        portfolioProject({
            title: 'iGold', company: 'iGold', slug: 'social-launch-campaign',
            sector: 'Investment & Precious Metals',
            summary: 'An ongoing Instagram content system developed for iGold, a Bulgarian company specialising in investment gold, silver and collectible precious-metal products. The grid combined product presentation, educational content and investment-focused communication within a consistent and recognisable visual structure.',
          cover: 'images/social/04.svg', image1: 'images/social/04.svg', image2: 'images/social/04.svg', image3: 'images/social/04.svg'
        }),
        portfolioProject({
          title: 'Awareness Campaign', company: 'Client Name', slug: 'awareness-campaign',
          sector: 'Public Interest · Education · Digital Media',
          summary: 'An accessible campaign direction created to make an important message easier to understand, remember and share.',
          cover: 'images/social/05.svg', image1: 'images/social/05.svg', image2: 'images/social/05.svg', image3: 'images/social/05.svg'
        }),
        portfolioProject({
          title: 'Seasonal Content System', company: 'Client Name', slug: 'seasonal-content-system',
          sector: 'Retail · E-commerce · Social Content',
          summary: 'A modular content system that keeps seasonal communication varied while maintaining a consistent and recognisable brand presence.',
          cover: 'images/social/06.svg', image1: 'images/social/06.svg', image2: 'images/social/06.svg', image3: 'images/social/06.svg'
        })
      ]
    },

    packaging: {
      index: '03 / 06',
      title: 'Packaging',
        companies: ['Redfood Nature', 'Russisches Schaschlik', 'LOGOPLAY Holzspiele'],
      lead: 'We help products communicate their value, stand out in the right way and remain consistent across the entire range.',
      capabilities: ['Packaging concepts', 'Label systems', 'Product ranges', 'Production-ready artwork'],
        cover: { src: 'images/category-covers/packaging.webp', alt: 'Packaging category cover', position: 'center', fit: 'cover' },
      rows: [2, 2, 1],
      images: [
        portfolioProject({
            title: 'Daily Vitality', company: 'Nourish & Purr', slug: 'collagen-packaging-system',
            sector: 'Pet Wellness · Animal Nutrition',
            summary: 'Packaging design for a modern cat wellness brand offering vet-formulated functional treats. The visual system combines playful typography, distinctive cat imagery and clear benefit communication to create packaging that feels smart, confident and approachable.',
            cover: 'images/packaging/cover-nourish.webp', image1: 'images/packaging/nourish-01.webp', image2: 'images/packaging/nourish-02.webp', image3: 'images/packaging/nourish-03.webp'
        }),
        portfolioProject({
            title: 'FOCUS Adaptogenic Mushroom Coffee', company: 'Soma Functionals', slug: 'premium-supplement-range',
            sector: 'Functional Beverages',
            summary: 'A sophisticated packaging concept for a premium functional coffee combining single-origin ground coffee with medicinal mushrooms and adaptogens. The design balances refined typography and a minimal black-and-white aesthetic with hypnotic geometric side patterns, creating a distinctive identity that communicates focus, clarity and sustained energy. The packaging system was developed with future product variants and flavours in mind.',
            cover: 'images/packaging/cover-soma.webp', image1: 'images/packaging/soma-01.webp', image2: 'images/packaging/soma-02.webp', image3: 'images/packaging/soma-03.webp'
        }),
        portfolioProject({
            title: 'Cellular Miracle Mix', company: 'Energized Health', slug: 'daily-wellness-packaging',
            sector: 'Health & Wellness · Physical Fitness',
            summary: 'A bold packaging system for Cellular Miracle Mix, a cellular support formula designed to promote vitality and overall well-being. Dynamic typography, strong visual hierarchy and energetic color contrasts create a confident and recognizable presence. Distinct color coding and ingredient imagery differentiate each flavor while maintaining a consistent identity across the complete product range.',
            cover: 'images/packaging/cover-miracle.webp', image1: 'images/packaging/miracle-01.webp', image2: 'images/packaging/miracle-02.webp', image3: 'images/packaging/miracle-03.webp'
        }),
        portfolioProject({
            title: 'Herbal Tea Sampler Gift Set', company: 'Green Valley Herbal Tea Company', slug: 'tea-label-collection',
            sector: 'Food & Beverage · Organic Retail',
            summary: 'A complete packaging concept for Green Valley Herbal Tea Company’s organic tea sampler gift set. The design combines delicate botanical details, watercolor mountain scenery and a warm natural colour palette inspired by the teas’ Colorado origin. Individual colour-coded envelopes make each blend easy to identify, while the premium gift box brings the collection together in a calm, refined and cohesive presentation.',
            cover: 'images/packaging/cover-green-valley.webp', image1: 'images/packaging/green-valley-01.webp', image2: 'images/packaging/green-valley-02.webp', image3: 'images/packaging/green-valley-03.webp'
        }),
        portfolioProject({
            title: 'West Winds 12 Year Old Single Malt Whisky', company: 'The West Winds Distillers', slug: 'artisan-tea-packaging',
            sector: 'Food & Drink',
            summary: 'A premium label design for a limited-edition Australian 12 Year Old Single Malt Whisky matured in bourbon casks. The intricate die-cut composition combines rich charcoal tones, copper detailing and expressive typography to communicate rarity, craftsmanship and provenance. Embossed elements, metallic finishes and individually numbered details create a tactile, collectible presentation while allowing the whisky itself to remain the visual focus.',
            cover: 'images/packaging/cover-west-winds.webp', image1: 'images/packaging/west-winds-01.webp', image2: 'images/packaging/west-winds-02.webp', image3: 'images/packaging/west-winds-03.webp'
        }),
        portfolioProject({
            title: 'Single Vineyard Nebbiolo', company: 'Everton Hills Estate', slug: 'limited-edition-product',
            sector: 'Wine & Spirits',
            summary: 'A distinctive label design created for the first release of Everton Hills Estate’s Single Vineyard Nebbiolo from Beechworth, Australia. The concept combines layered textured papers, torn edges and refined gold detailing to express the vineyard’s heritage through a contemporary and unexpected visual language. The warm natural palette and tactile materials reinforce the wine’s premium positioning, while the unconventional label construction gives the bottle a memorable presence on shelf.',
            cover: 'images/packaging/cover-everton-hills.webp', image1: 'images/packaging/everton-hills-01.webp', image2: 'images/packaging/everton-hills-02.webp', image3: 'images/packaging/everton-hills-03.webp'
        })
      ]
    },

    web: {
      index: '04 / 06',
      title: 'Web & Digital Design',
      companies: ['Client Name'],
      lead: 'We make businesses easier to understand, trust and act on through clear, intuitive digital design.',
      capabilities: ['Website design', 'Landing pages', 'E-commerce visuals', 'UI design'],
        cover: { src: 'images/category-covers/web.webp', alt: 'Web & Digital Design category cover', position: 'center', fit: 'cover' },
      rows: [2, 1, 2],
      images: [
          portfolioProject({ title: 'Touchstone Homes', company: 'Touchstone Homes', slug: 'corporate-website', sector: 'Luxury Construction · Residential Development', summary: 'A refined website for Touchstone Homes, a California-based developer of architecturally significant residences for private clients. The design combines immersive architectural photography, spacious layouts, elegant typography, and restrained navigation to communicate exclusivity, precision, and uncompromising craftsmanship across both desktop and mobile experiences.', cover: 'images/web/cover-touch-stone-homes.webp', image1: 'images/web/touch-stone-homes-01.webp', image2: 'images/web/touch-stone-homes-02.webp', image3: 'images/web/touch-stone-homes-03.webp' }),
          portfolioProject({ title: 'XFLOOW', company: 'XFLOOW', slug: 'campaign-landing-page', sector: 'Water Sports · Sports Technology', summary: 'A modern, immersive website concept for XFLOOW—an innovative electric foil assist system designed to make foiling more accessible, flexible, and enjoyable. The digital experience combines dynamic watersports photography, technical product information, community-focused content, and a distinctive visual system inspired by the ocean and movement.', cover: 'images/web/cover-xfloow.webp', image1: 'images/web/xfloow-01.webp', image2: 'images/web/xfloow-02.webp', image3: 'images/web/xfloow-03.webp' }),
          portfolioProject({ title: 'E-commerce Experience', company: 'Client Name', slug: 'ecommerce-experience', sector: 'E-commerce · Retail · Consumer Products', summary: 'A product-led digital experience balancing brand expression, easy navigation and a confident route towards purchase.', cover: 'images/web/cover-fire-circles.webp', image1: 'images/web/fire-circles-01.webp', image2: 'images/web/fire-circles-02.webp', image3: 'images/web/fire-circles-03.webp' }),
        portfolioProject({ title: 'Service Platform UI', company: 'Client Name', slug: 'service-platform-ui', sector: 'Technology · SaaS · User Experience', summary: 'A structured interface system created to make a complex service feel accessible, consistent and easy to use.', cover: 'images/web/04.svg', image1: 'images/web/04.svg', image2: 'images/web/04.svg', image3: 'images/web/04.svg' }),
        portfolioProject({ title: 'Digital Brand Hub', company: 'Client Name', slug: 'digital-brand-hub', sector: 'Brand Management · Internal Platform · Global Teams', summary: 'A central digital hub that helps teams find, understand and apply brand assets consistently across markets.', cover: 'images/web/05.svg', image1: 'images/web/05.svg', image2: 'images/web/05.svg', image3: 'images/web/05.svg' }),
        portfolioProject({ title: 'Event Microsite', company: 'Client Name', slug: 'event-microsite', sector: 'Events · Registration · Digital Communication', summary: 'A compact event microsite designed to present the programme clearly and make the path to registration effortless.', cover: 'images/web/06.svg', image1: 'images/web/06.svg', image2: 'images/web/06.svg', image3: 'images/web/06.svg' })
      ]
    },

    print: {
      index: '05 / 06',
      title: 'Editorial & Print',
        companies: ['Architects Darling', 'Fonte', 'König'],
      lead: 'We transform complex information into clear, structured communication that people can understand and act on.',
        capabilities: ['Publications, brochures & catalogues', 'Brochures & sales materials', 'Presentations & pitch decks', 'Editorial systems & templates', 'Print production & artwork'],
        cover: { src: 'images/category-covers/print.webp', alt: 'Editorial & Print category cover', position: 'center', fit: 'cover' },
      rows: [2, 1, 2],
      images: [
          portfolioProject({ title: 'Architects’ Darling 2026', company: 'Heinze', slug: 'international-business-brochure', sector: 'Art Direction · Invitation Design · Print Production', summary: 'A premium multi-panel invitation designed for Architects’ Darling 2026. The concept combines golden light effects, minimalist typography, and dramatic black contrasts, transforming the event programme into an elegant and memorable print experience.', cover: 'images/print/cover-darling.webp', image1: 'images/print/darling-01.webp', image2: 'images/print/darling-02.webp', image3: 'images/print/darling-03.webp' }),
          portfolioProject({ title: 'Fonte Drinks', company: 'Fonte Drinks AG', slug: 'corporate-publication', sector: 'Beverage Brand', summary: 'A vibrant recipe booklet designed for FONTE to showcase its range of specialty beverage concentrates, syrups and latte blends. The project combines clear preparation instructions, bold product photography and a structured editorial layout. The result is an engaging and easy-to-use presentation that reflects the brand’s playful, contemporary and handcrafted identity.', cover: 'images/print/cover-fonte.webp', image1: 'images/print/fonte-01.webp', image2: 'images/print/fonte-02.webp', image3: 'images/print/fonte-03.webp' }),
          portfolioProject({ title: 'Кunstrasen König', company: 'Kunstrasen König', slug: 'annual-report', sector: 'Home & Garden · Landscape Design', summary: 'A premium product catalogue created for Kunstrasen König, a German specialist in artificial grass solutions. The editorial concept combines lifestyle photography, structured product information and a fresh green-and-white visual language to communicate quality, comfort and effortless outdoor living.', cover: 'images/print/cover-konig.webp', image1: 'images/print/konig-01.webp', image2: 'images/print/konig-02.webp', image3: 'images/print/konig-03.webp' }),
          portfolioProject({ title: 'Assistor', company: 'AssistRoute', slug: 'sales-presentation', sector: 'Digital Marketplace · Automotive Services', summary: 'An illustrated online infographic created for The Road Assistor—a business-listing platform connecting motorists directly with independent roadside assistance providers. The design uses bold typography, colorful cityscapes and road-inspired graphics to transform a complex range of services into a clear and engaging visual journey.', cover: 'images/print/cover-assistor.webp', image1: 'images/print/assistor-01.webp', image2: 'images/print/assistor-02.webp', image3: 'images/print/assistor-03.webp' }),
          portfolioProject({ title: 'En Mode Avion', company: 'Disruptive Production', slug: 'product-catalogue', sector: 'Film & Entertainment', summary: 'Poster design for En Mode Avion, an independent documentary following a journey across the Pyrenees. The artwork combines the protagonist and mountain landscape to express solitude, freedom and inner transformation.', cover: 'images/print/cover-avion.webp', image1: 'images/print/avion-01.webp', image2: 'images/print/avion-02.webp', image3: 'images/print/avion-03.webp' }),
          portfolioProject({ title: 'Maverick', company: 'Maverick Property Group', slug: 'premium-invitation', sector: 'Real Estate Investment · Property Management', summary: 'A clean and sophisticated investor presentation developed for Maverick Property Group—a hands-on multifamily real estate investment firm based in Minnesota. The deck presents the company’s investment strategy, operational model, track record and value-creation approach through strong typography, structured layouts, financial graphics and a visually engaging renovation case study.', cover: 'images/print/cover-maverick.webp', image1: 'images/print/maverick-01.webp', image2: 'images/print/maverick-02.webp', image3: 'images/print/maverick-03.webp' })
      ]
    },

    events: {
      index: '06 / 06',
      title: 'Events & Large Format',
      companies: ['Heinze', 'Client Name'],
      lead: 'We create a clear and coordinated visual presence across events, exhibitions and the physical spaces around them.',
      capabilities: ['Event visual systems', 'Exhibition & spatial graphics', 'Signage & LED screens', 'Invitations & large-format production'],
        cover: { src: 'images/category-covers/events.webp', alt: 'Events & Large Format category cover', position: 'center', fit: 'cover' },
      rows: [1, 2, 2],
      images: [
        portfolioProject({ title: 'Awards Event Identity', company: 'Heinze', slug: 'awards-event-identity', sector: 'Architecture · Awards · Live Events', summary: 'A premium visual system created to give an established awards event a coherent presence from invitation to venue.', cover: 'images/events/01.svg', image1: 'images/events/01.svg', image2: 'images/events/01.svg', image3: 'images/events/01.svg' }),
        portfolioProject({ title: 'Exhibition Experience', company: 'Heinze', slug: 'exhibition-experience', sector: 'Architecture · Exhibition · B2B', summary: 'A coordinated exhibition direction connecting spatial graphics, information hierarchy and brand presence across the visitor experience.', cover: 'images/events/02.png', image1: 'images/events/02.png', image2: 'images/events/02.png', image3: 'images/events/02.png' }),
        portfolioProject({ title: 'Conference Visual System', company: 'Client Name', slug: 'conference-visual-system', sector: 'Conference · Business · Professional Audience', summary: 'A scalable conference system designed to organise content clearly across stage, screen, signage and supporting communication.', cover: 'images/events/03.svg', image1: 'images/events/03.svg', image2: 'images/events/03.svg', image3: 'images/events/03.svg' }),
        portfolioProject({ title: 'International Sports Event', company: 'Client Name', slug: 'international-sports-event', sector: 'Sport · Sponsorship · International Events', summary: 'A bold event identity built for immediate visibility across arena graphics, digital screens and international broadcast environments.', cover: 'images/events/04.svg', image1: 'images/events/04.svg', image2: 'images/events/04.svg', image3: 'images/events/04.svg' }),
        portfolioProject({ title: 'Retail Pop-up Environment', company: 'Client Name', slug: 'retail-pop-up-environment', sector: 'Retail · Experiential Marketing · Consumer Brand', summary: 'A flexible pop-up design system that translates the brand into a clear, engaging and practical physical experience.', cover: 'images/events/05.svg', image1: 'images/events/05.svg', image2: 'images/events/05.svg', image3: 'images/events/05.svg' }),
        portfolioProject({ title: 'Large-format Brand Rollout', company: 'Client Name', slug: 'large-format-brand-rollout', sector: 'Outdoor · Large Format · Multi-location Campaign', summary: 'A production-focused rollout that keeps one visual idea consistent and readable across demanding large-format applications.', cover: 'images/events/06.svg', image1: 'images/events/06.svg', image2: 'images/events/06.svg', image3: 'images/events/06.svg' })
      ]
    }
  }
};
