2 PERCENT WEBSITE — EDITING GUIDE

Open index.html in a browser to view the website locally.

THE IMPORTANT FILES
- content.js: portfolio categories, client names, email and all portfolio images
- index.html: homepage text, services and studio overview
- styles.css: colours, spacing, typography and layouts
- script.js: category opening and navigation behaviour

ADDING OR EDITING A CATEGORY
1. Open content.js.
2. Duplicate one complete category block inside categories.
3. Give it a unique key and update its title, companies, text, capabilities, rows and images.
4. Update the 01 / 07 numbering if the total number of categories changes.

PORTFOLIO IMAGES
- Every category has one independent cover image used only on the homepage.
- Every category also contains six independent gallery images.
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
  position: 'center'
  fit: 'contain'
- You may also use a complete online source: src: 'https://example.com/image.jpg'
- Keep fit: 'contain' to show the complete image without cropping or stretching.
- Use fit: 'cover' only when you intentionally want the image to fill and crop its frame.
- The included SVG files are temporary labelled placeholders showing which source belongs to each slot.

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

LOGO
- logo-2percent.png is the original supplied logo and has not been altered.

No build tools are required. The website is plain editable HTML, CSS and JavaScript.
