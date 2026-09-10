2 PERCENT WEBSITE — EDITING GUIDE

Open index.html in a browser to view the website locally.

THE IMPORTANT FILES
- content.js: portfolio categories, client names, email and all portfolio images
- index.html: homepage text, services and studio overview
- styles.css: colours, spacing, typography and layouts
- script.js: category opening and navigation behaviour
- robots.txt: crawler access rules and sitemap location
- sitemap.xml: the public page address supplied to search engines

ADDING OR EDITING A CATEGORY
1. Open content.js.
2. Duplicate one complete category block inside categories.
3. Give it a unique key and update its title, companies, text, capabilities, rows and images.
4. Update the 01 / 06 numbering if the total number of categories changes.

CURRENT CATEGORY STRUCTURE
- Brand & Identity: strategy, identity systems, art direction and guidelines.
- Campaigns & Content: key visuals, advertising, social media and campaign adaptations.
- Packaging: packaging concepts, labels, product ranges and production artwork.
- Web & Digital Design: websites, landing pages, e-commerce visuals and UI design.
- Editorial & Print: publications, presentations, sales materials and production artwork.
- Events & Large Format: event systems, exhibitions, signage, LED screens and large-format production.

Place each project according to the main business challenge it solves, not every format it contains. For example, social media assets belonging to one advertising idea should stay under Campaigns & Content.

PORTFOLIO IMAGES
- Every category has one independent cover image used only on the homepage.
- Every category also contains six independent gallery images.
- Every gallery image represents one independent project.
- Clicking a project opens its own short case-study view.
- Categories and projects receive shareable links automatically.
- The first gallery image is the large image shown after opening.
- The other five gallery images fill the rows below it.
- rows controls only how many detail images appear on each row. The values must total 5.
- Example: rows: [2, 1, 2] means two images, one full-width image, then two images.
- Desktop widths are calculated automatically from the real proportions of the uploaded images.
- Images sharing a row always finish on the same baseline with one consistent gap.
- On mobile, every image uses its natural height and the same vertical gap.
- Every image has its own src line, so each slot can point to a different file or web link.
- Put local replacement images in this folder beside index.html, or in a subfolder such as images/packaging/.
- For every image, set:
  src: 'images/packaging/your-image.jpg'
  company: 'The client name shown over this image'
  title: 'The project title'
  slug: 'short-project-link'
  industry: 'The client industry'
  market: 'Germany'
  summary: 'A short explanation of the challenge and solution.'
  services: ['Packaging design', 'Production artwork']
  gallery: [{ src: 'images/packaging/project-detail.jpg', company: 'Client name' }]
  position: 'center'
  fit: 'contain'
- You may also use a complete online source: src: 'https://example.com/image.jpg'
- Keep fit: 'contain' to show the complete image without cropping or stretching.
- Use fit: 'cover' only when you intentionally want the image to fill and crop its frame.
- slug is optional. When omitted, the website creates a unique link automatically.
- gallery is optional. When omitted, the project cover is also used inside the case study.
- The included SVG files are temporary labelled placeholders showing which source belongs to each slot.

SHAREABLE LINKS
- Open any category or project and copy the browser address.
- Category example: https://www.2pctstudio.com/#work/packaging
- Project example: https://www.2pctstudio.com/#work/packaging/redfood-nature
- Use category links in broad outreach and project links when one case is especially relevant.

RECOMMENDED IMAGE SIZES
- Homepage cover: 1600 x 1200 px (4:3)
- First opened image: 1920 x 1080 px (16:9)
- Standard wide image: 1600 x 900 px (16:9)
- Standard compact image: 1200 x 900 px (4:3)
- Panoramic image: approximately 2000 x 650 px
- Larger files are accepted; these dimensions are practical quality targets, not strict limits.

CATEGORY CONTENT
- title is the discipline shown before and after opening.
- companies is the client list shown under the category and inside it.
- lead is the short category introduction.
- capabilities is the compact service list inside the opened category.

CONTACT
- Current email: design@2pctstudio.com
- Change brand.email in content.js whenever needed.
- Clicking the email opens a new message in the visitor's email application.
- The icon beside the email copies the same address and briefly changes to a checkmark.
- The short contact form prepares a structured email in the visitor's preferred mail application.

LOGO
- logo-2percent.png is the original supplied logo and has not been altered.
- The active logo is images/site/studio-logo.svg, copied unchanged from your supplied vector file.
- Change only brand.logo in content.js to update the header, footer and hero together.
- Use a local transparent, single-colour SVG with outlined paths, not an embedded bitmap or a background rectangle.
- Header and footer colours are controlled by CSS masks; the same file becomes navy or white.
- The desktop hero draws only the exact original logo: first the large symbol, then PERCENT from left to right, followed by a subtle fill.
- Edit DRAW_SECONDS and FILL_SECONDS in hero-motion.js to change the pace.
- The outline and fill use the SAME original SVG geometry in the SAME viewport, so the logo never moves or changes size.
- The animation now also works when index.html is opened directly from your computer.
- After replacing studio-logo.svg, run: node tools/sync-logo-data.mjs
  This updates the embedded copy used by the hero animation and by the header/footer
  colour masks, so the same logo also displays when index.html is opened locally.
- This refreshes studio-logo-data.js, the automatically generated offline fallback. Online hosting still reads the SVG file directly.
- Reduced-motion visitors see the finished logo without animation.
- For replacement SVGs, outlined paths and polygons work best. SVGs with clipping, masks or gradients need adaptation.

No build tools are required. The website is plain editable HTML, CSS and JavaScript.
