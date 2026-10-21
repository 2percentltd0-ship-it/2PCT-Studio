2 PERCENT WEBSITE — EDITING GUIDE

OFFLINE USE
- Extract the complete ZIP archive first.
- Open index.html in Chrome, Edge or Firefox. Keep the folder structure unchanged.
- Google fonts need internet; without it the browser uses a similar fallback font.

THE FILES
- content.js     all portfolio content: categories, projects, images, email
- index.html     homepage texts (hero, section headings, How we work, contact)
- styles.css     all colours, spacing, typography and layouts (one file for every page)
- site.js        shared behaviour: header, menu, colour transitions, reveals, email copy
- home.js        builds the Selected work slider from content.js
- portfolio.js   builds the Projects page, discipline pages and project pages from content.js
- portfolio-template.html + tools/generate-pages.mjs   create the pages inside /work

SITE STRUCTURE
- Homepage: Hero → Selected work (sideways slider) → How we work → Contact
- Projects page (work/index.html): every project, with filter buttons per discipline.
  Filters switch instantly without reloading and jump to the top of the page.
- Discipline pages (work/packaging/ etc.): the same page with that filter already on
- Project pages: text and details stay on the left while the images scroll on the right;
  below: three more projects, previous / next links and a Start a project band

ADDING OR EDITING A PROJECT (content.js)
Required fields:
  title, company, slug, sector, summary, cover, image1, image2, image3
Optional fields:
  country: 'Australia'        shown on cards and on the project page
  year: '2025'                shown on the project page when filled in
  featured: 1                 puts the project in the homepage slider.
                              Use 1 to 6 for the order. Remove it to take it off.
  more: ['images/packaging/west-winds-04.webp', 'images/packaging/west-winds-05.webp']
                              any number of extra images under image3

After adding a project or changing a slug, run:  node tools/generate-pages.mjs

PLACEHOLDER IMAGES
- Projects whose cover is still a numbered placeholder (01.svg … 06.svg) are hidden
  everywhere: homepage, Projects page, filters and "next project" links.
- As soon as you put a real cover image in, the project appears automatically.
- A discipline with no real projects yet disappears from the filter buttons.

HOMEPAGE
- Selected work: projects with a featured number, in that order (6 is a good amount).
  On wide screens the section pins and the cards move sideways while you scroll;
  on phones it is a swipeable row.
- Colour transitions: each homepage section has data-tone="paper | deep | ice | signal".
  The colours for each tone are in TONES in site.js.

DESIGN RULES
- One corner radius for everything: --radius (4px) at the top of styles.css.
- Two kinds of action: .button (filled, primary) and .arrow-link (text + arrow).
- Pages fade in softly when they open.

RECOMMENDED IMAGE SIZES
- Covers: 1600 × 1200 px (4:3). Covers are cropped to 4:3 on cards, so keep the
  product roughly centred.
- Project images: 1600–2400 px wide; their natural proportions are kept.

SHAREABLE LINKS
- Projects: https://www.2pctstudio.com/work/
- Category: https://www.2pctstudio.com/work/packaging/
- Project: https://www.2pctstudio.com/work/packaging/artisan-tea-packaging/

CONTACT
- Email: brand.email in content.js (design@2pctstudio.com). The copy button copies it.

LOGO
- images/site/studio-logo.svg, used in the header and footer through a CSS mask
  (the same file turns dark or white automatically).
- If the logo SVG changes, put the same SVG markup into images/site/studio-logo-data.js
  so the logo also shows when the site is opened offline.

No build tools are required. The website is plain HTML, CSS and JavaScript.
