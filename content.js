/*
  EDIT THIS FILE FIRST.
  All portfolio categories, client names, text and image slots live here.

  Every category has one homepage cover and six gallery images.
  Every image represents one project and can also hold optional case-study details.
  A source can be a local filename or a full https:// link:
  images: [
    {
      src: 'project-cover.jpg',
      company: 'Client name',
      title: 'Project title',
      slug: 'short-project-link',
      industry: 'Industry',
      market: 'Germany',
      summary: 'A short explanation of the challenge and design solution.',
      approachTitle: 'The idea behind the work',
      approach: 'A short explanation of the key creative decision and how the system works.',
      outcome: 'Optional real-world result or delivered outcome.',
      year: '2026',
      services: ['Service one', 'Service two'],
      // Add two gallery images for the recommended three-image project page.
      // You can add more. Images keep their natural proportions in the case study.
      gallery: [
        { src: 'project-image-02.jpg', alt: 'Project detail' },
        { src: 'project-image-03.jpg', alt: 'Project detail' }
      ],
      position: 'center', fit: 'contain'
    },
    { src: 'https://example.com/project-detail.jpg', company: 'Client name', position: 'center', fit: 'contain' }
  ]
*/

window.SITE_CONTENT = {
  brand: {
    name: '2 Percent',
    // One transparent SVG for the header, footer and animated hero.
    logo: 'images/site/studio-logo.svg',
    email: 'design@2pctstudio.com'
  },
  categories: {
    // CATEGORY 1 — Edit the text, clients and six image sources below.
    branding: {
      index: '01 / 06', title: 'Brand & Identity',
      companies: ['Marienfelder Grillhaus'],
      lead: 'We help businesses become more recognisable, consistent and easier to trust across every customer touchpoint.',
      capabilities: ['Brand strategy & positioning', 'Visual identity systems', 'Art direction', 'Brand guidelines & rollout'],
      cover: { src: 'images/branding/cover.png', company: 'Marienfelder Grillhaus', position: 'center', fit: 'contain' },
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
      index: '02 / 06', title: 'Campaigns & Content',
      companies: ['COFO Entertainment'],
      lead: 'We turn important messages into focused visual ideas that earn attention and stay coherent across every channel.',
      capabilities: ['Creative direction', 'Key visuals & campaign systems', 'Social media & paid advertising', 'Outdoor graphics & vehicle wraps'],
        cover: { src: 'images/campaigns/cover.png', company: 'COFO Entertainment', position: 'center', fit: 'contain' },
      // Detail images per row: 1 + 2 + 2.
      rows: [1, 2, 2],
      images: [
        // First gallery image = large image at the top after opening.
        { src: 'images/campaigns/01.svg', company: 'COFO Entertainment', position: 'center', fit: 'contain' },
        { src: 'images/campaigns/02.svg', company: 'COFO Entertainment', position: 'center', fit: 'contain' },
        { src: 'images/campaigns/03.svg', company: 'COFO Entertainment', position: 'center', fit: 'contain' },
        { src: 'images/social/04.svg', company: 'Client name', position: 'center', fit: 'contain' },
        { src: 'images/social/05.svg', company: 'Client name', position: 'center', fit: 'contain' },
        { src: 'images/social/06.svg', company: 'Client name', position: 'center', fit: 'contain' }
      ]
    },
    // CATEGORY 3
    packaging: {
      index: '03 / 06', title: 'Packaging',
      companies: ['Redfood Nature', 'Cuxhavener Teekontor'],
      lead: 'We help products communicate their value, stand out in the right way and remain consistent across the entire range.',
      capabilities: ['Packaging concepts', 'Label systems', 'Product ranges', 'Production-ready artwork'],
        cover: { src: 'images/packaging/cover.png', company: 'Redfood Nature', position: 'center', fit: 'contain' },
      // Detail images per row: 2 + 2 + 1.
      rows: [2, 2, 1],
      images: [
        // First gallery image = large image at the top after opening.
        { src: 'images/packaging/01.svg', company: 'Redfood Nature', position: 'center', fit: 'contain' },
        { src: 'images/packaging/02.png', company: 'Redfood Nature', position: 'center', fit: 'contain' },
        { src: 'images/packaging/03.png', company: 'Redfood Nature', position: 'center', fit: 'contain' },
        { src: 'images/packaging/04.png', company: 'Cuxhavener Teekontor', position: 'center', fit: 'contain' },
        { src: 'images/packaging/05.png', company: 'Cuxhavener Teekontor', position: 'center', fit: 'contain' },
        { src: 'images/packaging/06.svg', company: 'Cuxhavener Teekontor', position: 'center', fit: 'contain' }
      ]
    },
    // CATEGORY 4 — Replace "Client name" when adding the real work.
    web: {
      index: '04 / 06', title: 'Web & Digital Design',
      companies: ['Client name'],
      lead: 'We make businesses easier to understand, trust and act on through clear, intuitive digital design.',
      capabilities: ['Website design', 'Landing pages', 'E-commerce visuals', 'UI design'],
        cover: { src: 'images/web/cover.png', company: 'Client name', position: 'center', fit: 'contain' },
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
    print: {
      index: '05 / 06', title: 'Editorial & Print',
      companies: ['BAFA Afrika'],
      lead: 'We transform complex information into clear, structured communication that people can understand and act on.',
      capabilities: ['Publications, brochures & catalogues', 'Presentations & pitch decks', 'Sales materials', 'Production artwork'],
      cover: { src: 'images/print/cover.png', company: 'BAFA Afrika', position: 'center', fit: 'contain' },
      // Detail images per row: 2 + 1 + 2.
      rows: [2, 1, 2],
      images: [
        // First gallery image = large image at the top after opening.
        { src: 'images/print/01.svg', company: 'BAFA Afrika', position: 'center', fit: 'contain' },
        { src: 'images/print/02.png', company: 'BAFA Afrika', position: 'center', fit: 'contain' },
        { src: 'images/print/03.svg', company: 'BAFA Afrika', position: 'center', fit: 'contain' },
        { src: 'images/print/04.svg', company: 'BAFA Afrika', position: 'center', fit: 'contain' },
        { src: 'images/print/05.svg', company: 'BAFA Afrika', position: 'center', fit: 'contain' },
        { src: 'images/print/06.svg', company: 'BAFA Afrika', position: 'center', fit: 'contain' }
      ]
    },
    // CATEGORY 6
    events: {
      index: '06 / 06', title: 'Events & Large Format',
      companies: ['Heinze'],
      lead: 'We create a clear and coordinated visual presence across events, exhibitions and the physical spaces around them.',
      capabilities: ['Event visual systems', 'Exhibition & spatial graphics', 'Signage & LED screens', 'Invitations & large-format production'],
      cover: { src: 'images/events/cover.png', company: 'Heinze', position: 'center', fit: 'contain' },
      // Detail images per row: 1 + 2 + 2.
      rows: [1, 2, 2],
      images: [
        // First gallery image = large image at the top after opening.
        { src: 'images/events/01.svg', company: 'Heinze', position: 'center', fit: 'contain' },
        { src: 'images/events/02.png', company: 'Heinze', position: 'center', fit: 'contain' },
        { src: 'images/events/03.svg', company: 'Heinze', position: 'center', fit: 'contain' },
        { src: 'images/events/04.svg', company: 'Heinze', position: 'center', fit: 'contain' },
        { src: 'images/events/05.svg', company: 'Heinze', position: 'center', fit: 'contain' },
        { src: 'images/events/06.svg', company: 'Heinze', position: 'center', fit: 'contain' }
      ]
    }
  }
};
