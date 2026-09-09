/*
  EDIT THIS FILE FIRST.
  All portfolio categories, client names, text and image slots live here.

  Every category has one homepage cover and six gallery images.
  Every image has its own editable source and company label.
  A source can be a local filename or a full https:// link:
  images: [
    { src: 'project-cover.jpg', company: 'Client name', position: 'center', fit: 'contain' },
    { src: 'https://example.com/project-detail.jpg', company: 'Client name', position: 'center', fit: 'contain' }
  ]
*/

window.SITE_CONTENT = {
  brand: {
    name: '2 Percent',
    logo: 'logo-2percent.png',
    email: 'design@2pctstudio.com'
  },
  // Replace only the src values below when your final header logo and hero image are ready.
  assets: {
    headerLogo: { src: 'images/site/header-logo-placeholder.svg', alt: 'Header logo — recommended source size 512 × 512 px' },
    heroImage: { src: 'images/site/hero-image-placeholder.svg', alt: 'Hero image — recommended source size 1200 × 1500 px' }
  },
  categories: {
    // CATEGORY 1 — Edit the text, clients and six image sources below.
    branding: {
      index: '01 / 07', title: 'Brand Identity & Visual Systems',
      companies: ['Marienfelder Grillhaus'],
      lead: 'We help businesses become more recognisable, consistent and easier to trust across every customer touchpoint.',
      capabilities: ['Visual identity', 'Brand application', 'Typography & colour systems', 'Guidelines'],
      cover: { src: 'images/branding/cover.svg', company: 'Marienfelder Grillhaus', position: 'center', fit: 'contain' },
      // Detail images per row. The five values after the hero are grouped 2 + 1 + 2.
      rows: [2, 1, 2],
      images: [
        // First gallery image = large image at the top after opening.
        { src: 'images/branding/01.svg', company: 'Marienfelder Grillhaus', position: 'center', fit: 'contain' },
        { src: 'images/branding/02.svg', company: 'Marienfelder Grillhaus', position: 'center', fit: 'contain' },
        { src: 'images/branding/03.svg', company: 'Marienfelder Grillhaus', position: 'center', fit: 'contain' },
        { src: 'images/branding/04.svg', company: 'Marienfelder Grillhaus', position: 'center', fit: 'contain' },
        { src: 'images/branding/05.svg', company: 'Marienfelder Grillhaus', position: 'center', fit: 'contain' },
        { src: 'images/branding/06.svg', company: 'Marienfelder Grillhaus', position: 'center', fit: 'contain' }
      ]
    },
    // CATEGORY 2
    campaigns: {
      index: '02 / 07', title: 'Campaigns & Key Visuals',
      companies: ['COFO Entertainment'],
      lead: 'We turn complex messages into focused visual ideas that attract attention and remain clear across every format.',
      capabilities: ['Creative direction', 'Key visuals', 'Campaign systems', 'Format adaptations'],
      cover: { src: 'images/campaigns/cover.svg', company: 'COFO Entertainment', position: 'center', fit: 'contain' },
      // Detail images per row: 1 + 2 + 2.
      rows: [1, 2, 2],
      images: [
        // First gallery image = large image at the top after opening.
        { src: 'images/campaigns/01.svg', company: 'COFO Entertainment', position: 'center', fit: 'contain' },
        { src: 'images/campaigns/02.svg', company: 'COFO Entertainment', position: 'center', fit: 'contain' },
        { src: 'images/campaigns/03.svg', company: 'COFO Entertainment', position: 'center', fit: 'contain' },
        { src: 'images/campaigns/04.svg', company: 'COFO Entertainment', position: 'center', fit: 'contain' },
        { src: 'images/campaigns/05.svg', company: 'COFO Entertainment', position: 'center', fit: 'contain' },
        { src: 'images/campaigns/06.svg', company: 'COFO Entertainment', position: 'center', fit: 'contain' }
      ]
    },
    // CATEGORY 3 — Replace "Client name" when adding the real work.
    social: {
      index: '03 / 07', title: 'Social Media & Digital Content',
      companies: ['Client name'],
      lead: 'We help brands stay recognisable and relevant across fast-moving digital channels without reinventing the direction for every post.',
      capabilities: ['Social media design', 'Paid advertising', 'Stories & carousels', 'Digital content systems'],
      cover: { src: 'images/social/cover.svg', company: 'Client name', position: 'center', fit: 'contain' },
      // Detail images per row: 2 + 1 + 2.
      rows: [2, 1, 2],
      images: [
        // First gallery image = large image at the top after opening.
        { src: 'images/social/01.svg', company: 'Client name', position: 'center', fit: 'contain' },
        { src: 'images/social/02.svg', company: 'Client name', position: 'center', fit: 'contain' },
        { src: 'images/social/03.svg', company: 'Client name', position: 'center', fit: 'contain' },
        { src: 'images/social/04.svg', company: 'Client name', position: 'center', fit: 'contain' },
        { src: 'images/social/05.svg', company: 'Client name', position: 'center', fit: 'contain' },
        { src: 'images/social/06.svg', company: 'Client name', position: 'center', fit: 'contain' }
      ]
    },
    // CATEGORY 4 — Replace "Client name" when adding the real work.
    web: {
      index: '04 / 07', title: 'Website Design & Digital Experiences',
      companies: ['Client name'],
      lead: 'We make businesses easier to understand, trust and engage with through clear, intuitive digital experiences.',
      capabilities: ['Website design', 'Landing pages', 'Portfolio websites', 'UI design'],
      cover: { src: 'images/web/cover.svg', company: 'Client name', position: 'center', fit: 'contain' },
      // Detail images per row: 2 + 1 + 2.
      rows: [2, 1, 2],
      images: [
        // First gallery image = large image at the top after opening.
        { src: 'images/web/01.svg', company: 'Client name', position: 'center', fit: 'contain' },
        { src: 'images/web/02.svg', company: 'Client name', position: 'center', fit: 'contain' },
        { src: 'images/web/03.svg', company: 'Client name', position: 'center', fit: 'contain' },
        { src: 'images/web/04.svg', company: 'Client name', position: 'center', fit: 'contain' },
        { src: 'images/web/05.svg', company: 'Client name', position: 'center', fit: 'contain' },
        { src: 'images/web/06.svg', company: 'Client name', position: 'center', fit: 'contain' }
      ]
    },
    // CATEGORY 5
    packaging: {
      index: '05 / 07', title: 'Packaging & Label Design',
      companies: ['Redfood Nature', 'Cuxhavener Teekontor'],
      lead: 'We help products communicate their value, stand out in the right way and remain consistent across the entire range.',
      capabilities: ['Packaging concepts', 'Label systems', 'Product ranges', 'Print-ready artwork'],
      cover: { src: 'images/packaging/cover.svg', company: 'Redfood Nature', position: 'center', fit: 'contain' },
      // Detail images per row: 2 + 2 + 1.
      rows: [2, 2, 1],
      images: [
        // First gallery image = large image at the top after opening.
        { src: 'images/packaging/01.svg', company: 'Redfood Nature', position: 'center', fit: 'contain' },
        { src: 'images/packaging/02.svg', company: 'Redfood Nature', position: 'center', fit: 'contain' },
        { src: 'images/packaging/03.svg', company: 'Redfood Nature', position: 'center', fit: 'contain' },
        { src: 'images/packaging/04.svg', company: 'Cuxhavener Teekontor', position: 'center', fit: 'contain' },
        { src: 'images/packaging/05.svg', company: 'Cuxhavener Teekontor', position: 'center', fit: 'contain' },
        { src: 'images/packaging/06.svg', company: 'Cuxhavener Teekontor', position: 'center', fit: 'contain' }
      ]
    },
    // CATEGORY 6
    print: {
      index: '06 / 07', title: 'Print & Editorial Design',
      companies: ['BAFA Afrika'],
      lead: 'We transform complex information into clear, structured communication that people can understand and act on.',
      capabilities: ['Editorial concepts', 'Brochures & catalogues', 'Posters', 'Production artwork'],
      cover: { src: 'images/print/cover.svg', company: 'BAFA Afrika', position: 'center', fit: 'contain' },
      // Detail images per row: 2 + 1 + 2.
      rows: [2, 1, 2],
      images: [
        // First gallery image = large image at the top after opening.
        { src: 'images/print/01.svg', company: 'BAFA Afrika', position: 'center', fit: 'contain' },
        { src: 'images/print/02.svg', company: 'BAFA Afrika', position: 'center', fit: 'contain' },
        { src: 'images/print/03.svg', company: 'BAFA Afrika', position: 'center', fit: 'contain' },
        { src: 'images/print/04.svg', company: 'BAFA Afrika', position: 'center', fit: 'contain' },
        { src: 'images/print/05.svg', company: 'BAFA Afrika', position: 'center', fit: 'contain' },
        { src: 'images/print/06.svg', company: 'BAFA Afrika', position: 'center', fit: 'contain' }
      ]
    },
    // CATEGORY 7
    events: {
      index: '07 / 07', title: 'Events, Exhibitions & Large Format',
      companies: ['Heinze'],
      lead: 'We make brands visible, consistent and memorable across physical spaces—from the first invitation to the complete event environment.',
      capabilities: ['Event identities', 'Exhibition graphics', 'Invitations', 'Large-format adaptations'],
      cover: { src: 'images/events/cover.svg', company: 'Heinze', position: 'center', fit: 'contain' },
      // Detail images per row: 1 + 2 + 2.
      rows: [1, 2, 2],
      images: [
        // First gallery image = large image at the top after opening.
        { src: 'images/events/01.svg', company: 'Heinze', position: 'center', fit: 'contain' },
        { src: 'images/events/02.svg', company: 'Heinze', position: 'center', fit: 'contain' },
        { src: 'images/events/03.svg', company: 'Heinze', position: 'center', fit: 'contain' },
        { src: 'images/events/04.svg', company: 'Heinze', position: 'center', fit: 'contain' },
        { src: 'images/events/05.svg', company: 'Heinze', position: 'center', fit: 'contain' },
        { src: 'images/events/06.svg', company: 'Heinze', position: 'center', fit: 'contain' }
      ]
    }
  }
};
