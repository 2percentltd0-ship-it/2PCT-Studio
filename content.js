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
  categories: {
    // CATEGORY 1 — Edit the text, clients and six image sources below.
    branding: {
      index: '01 / 07', title: 'Branding & Identity',
      companies: ['Marienfelder Grillhaus'],
      lead: 'Distinctive identity systems built to stay recognisable across every customer touchpoint.',
      capabilities: ['Visual identity', 'Brand application', 'Typography & colour systems', 'Guidelines'],
      cover: { src: 'images/branding/cover.svg', company: 'Marienfelder Grillhaus', position: 'center', fit: 'contain' },
      // Layout only. Leave this line unchanged if you only want to replace images.
      rows: [{ columns: [7, 5], height: 'medium' }, { columns: [12], height: 'panorama' }, { columns: [5, 7], height: 'medium' }],
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
      index: '02 / 07', title: 'Campaigns & Advertising',
      companies: ['COFO Entertainment'],
      lead: 'Strong campaign ideas shaped for immediate impact across print, digital and large format.',
      capabilities: ['Creative direction', 'Key visuals', 'Campaign systems', 'Format adaptations'],
      cover: { src: 'images/campaigns/cover.svg', company: 'COFO Entertainment', position: 'center', fit: 'contain' },
      // Layout only.
      rows: [{ columns: [12], height: 'panorama' }, { columns: [5, 7], height: 'medium' }, { columns: [6, 6], height: 'balanced' }],
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
      lead: 'Flexible visual systems created for consistent, recognisable communication across digital channels.',
      capabilities: ['Social media design', 'Paid advertising', 'Stories & carousels', 'Digital content systems'],
      cover: { src: 'images/social/cover.svg', company: 'Client name', position: 'center', fit: 'contain' },
      // Layout only.
      rows: [{ columns: [6, 6], height: 'balanced' }, { columns: [12], height: 'panorama' }, { columns: [7, 5], height: 'medium' }],
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
      index: '04 / 07', title: 'Website & Digital Design',
      companies: ['Client name'],
      lead: 'Clear digital experiences that translate brand character into intuitive, responsive interfaces.',
      capabilities: ['Website design', 'Landing pages', 'Portfolio websites', 'UI design'],
      cover: { src: 'images/web/cover.svg', company: 'Client name', position: 'center', fit: 'contain' },
      // Layout only.
      rows: [{ columns: [8, 4], height: 'compact' }, { columns: [12], height: 'wide' }, { columns: [5, 7], height: 'medium' }],
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
      index: '05 / 07', title: 'Packaging',
      companies: ['Redfood Nature', 'Cuxhavener Teekontor'],
      lead: 'Packaging families with clear hierarchy, shelf presence and production-ready consistency.',
      capabilities: ['Packaging concepts', 'Label systems', 'Product ranges', 'Print-ready artwork'],
      cover: { src: 'images/packaging/cover.svg', company: 'Redfood Nature', position: 'center', fit: 'contain' },
      // Layout only.
      rows: [{ columns: [6, 6], height: 'balanced' }, { columns: [8, 4], height: 'compact' }, { columns: [12], height: 'panorama' }],
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
      index: '06 / 07', title: 'Print & Editorial',
      companies: ['BAFA Afrika'],
      lead: 'Complex information shaped into confident, readable and production-ready communication.',
      capabilities: ['Editorial concepts', 'Brochures & catalogues', 'Posters', 'Production artwork'],
      cover: { src: 'images/print/cover.svg', company: 'BAFA Afrika', position: 'center', fit: 'contain' },
      // Layout only.
      rows: [{ columns: [8, 4], height: 'compact' }, { columns: [12], height: 'wide' }, { columns: [6, 6], height: 'balanced' }],
      images: [
        // First gallery image = large image at the top after opening.
        { src: 'images/print/01.png', company: 'BAFA Afrika', position: 'center', fit: 'contain' },
        { src: 'images/print/01.png', company: 'BAFA Afrika', position: 'center', fit: 'contain' },
          { src: 'images/print/022.png', company: 'BAFA Afrika', position: 'center', fit: 'contain' },
        { src: 'images/print/04.svg', company: 'BAFA Afrika', position: 'center', fit: 'contain' },
        { src: 'images/print/05.svg', company: 'BAFA Afrika', position: 'center', fit: 'contain' },
        { src: 'images/print/06.svg', company: 'BAFA Afrika', position: 'center', fit: 'contain' }
      ]
    },
    // CATEGORY 7
    events: {
      index: '07 / 07', title: 'Events, Exhibitions & Large Format',
      companies: ['Heinze'],
      lead: 'Visual systems designed to stay clear and memorable from a personal invitation to an exhibition hall.',
      capabilities: ['Event identities', 'Exhibition graphics', 'Invitations', 'Large-format adaptations'],
      cover: { src: 'images/events/cover.svg', company: 'Heinze', position: 'center', fit: 'contain' },
      // Layout only.
      rows: [{ columns: [12], height: 'panorama' }, { columns: [7, 5], height: 'medium' }, { columns: [5, 7], height: 'medium' }],
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
