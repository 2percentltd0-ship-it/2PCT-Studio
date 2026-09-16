2 PERCENT WEBSITE — EDITING GUIDE

OFFLINE USE
- Extract the complete ZIP archive first.
- Open the root index.html file in Chrome, Edge or Firefox.
- Keep the folder structure unchanged: work and images must stay beside index.html.
- Pages, images and navigation work directly from the extracted folder. The preferred Google fonts need internet access; without it, the browser uses its sans-serif fallback.

THE IMPORTANT FILES
- content.js: portfolio categories, client names, email and all portfolio images
- index.html: homepage text, services and studio overview
- styles.css: colours, spacing, typography and layouts
- home.js: homepage behaviour
- portfolio.js: category and case-study page behaviour
- portfolio.css: category and case-study layouts
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
- The category cover must not reuse a project cover or project image file.
- Every category contains six projects built from the same portfolioProject template.
- Clicking a category or project opens a real subpage without a popup.
- Categories and projects receive shareable links automatically.
- cover inside a project is its card image inside the opened category.
- image1, image2 and image3 are the three large images on the project page.
- All three project-page images appear one below another and retain their proportions.
- Put local replacement images in this folder beside index.html, or in a subfolder such as images/packaging/.
- Replace these fields directly in each project:
  title: 'The project title'
  company: 'Client name'
  slug: 'unique-project-link'
  sector: 'Industry · Market · Project type'
  summary: 'One concise case-study introduction.'
  cover: 'images/category/project-cover.jpg'
  image1: 'images/category/project-image-01.jpg'
  image2: 'images/category/project-image-02.jpg'
  image3: 'images/category/project-image-03.jpg'
- The included numbered SVG files are temporary placeholders. Reusing one placeholder in all four fields is intentional until real images are added.
- Keep project filenames different from the category cover filename.
- After changing a slug, run: node tools/generate-pages.mjs

CASE-STUDY TEXT
- summary appears below the project title before the first large image.
- sector is the supporting information shown on cards and in the project details.
- The standard template deliberately has no text blocks between the three images.

SHAREABLE LINKS
- Open any category or project and copy the browser address.
- Category example: https://www.2pctstudio.com/work/packaging/
- Project example: https://www.2pctstudio.com/work/packaging/redfood-nature-1/
- Use category links in broad outreach and project links when one case is especially relevant.

RECOMMENDED IMAGE SIZES
- Homepage cover: 1600 x 1200 px (4:3)
- Category covers and empty project slots: 1600 x 1200 px (4:3).
- Opened project images: 1600–2400 px wide; natural proportions are preserved.
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

LOGO
- The active logo is images/site/studio-logo.svg, copied unchanged from your supplied vector file.
- Change only brand.logo in content.js to update the header, footer and hero together.
- Use a local transparent, single-colour SVG with outlined paths, not an embedded bitmap or a background rectangle.
- Header and footer colours are controlled by CSS masks; the same file becomes navy or white.
- The desktop hero draws only the exact original logo: first the large symbol, then PERCENT from left to right, followed by a subtle fill.
- Edit DRAW_SECONDS and FILL_SECONDS in hero-motion.js to change the pace.
- The outline and fill use the SAME original SVG geometry in the SAME viewport, so the logo never moves or changes size.
- The animation now also works when index.html is opened directly from your computer.
- If the logo SVG changes, update images/site/studio-logo-data.js with the same SVG markup so the offline fallback remains identical.
- Reduced-motion visitors see the finished logo without animation.
- For replacement SVGs, outlined paths and polygons work best. SVGs with clipping, masks or gradients need adaptation.

No build tools are required. The website is plain editable HTML, CSS and JavaScript.
