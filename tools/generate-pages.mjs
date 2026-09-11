import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=process.cwd();
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'content.js'),'utf8'),sandbox);
const categories=sandbox.window.SITE_CONTENT.categories;
const template=fs.readFileSync(path.join(root,'portfolio-template.html'),'utf8');
const slugify=value=>String(value||'project').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const escape=value=>String(value).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const page=(title,description,canonical,rootPath,category='',project='')=>template.replaceAll('%%TITLE%%',escape(title)).replaceAll('%%DESCRIPTION%%',escape(description)).replaceAll('%%CANONICAL%%',canonical).replaceAll('%%ROOT%%',rootPath).replaceAll('%%CATEGORY%%',escape(category)).replaceAll('%%PROJECT%%',escape(project));
const workDir=path.join(root,'work');
// This directory contains generated pages only. Rebuild it from scratch so renamed
// or removed projects cannot leave stale, unreachable HTML files behind.
fs.rmSync(workDir,{recursive:true,force:true});
fs.mkdirSync(workDir,{recursive:true});
fs.writeFileSync(path.join(workDir,'index.html'),page('Selected work — 2 Percent','Explore selected brand, campaign, packaging, digital, editorial and event design work by 2 Percent.','https://www.2pctstudio.com/work/','../'));
const urls=['https://www.2pctstudio.com/','https://www.2pctstudio.com/work/'];
for(const [key,category] of Object.entries(categories)){
  const categoryDir=path.join(root,'work',key); fs.mkdirSync(categoryDir,{recursive:true});
  fs.writeFileSync(path.join(categoryDir,'index.html'),page(`${category.title} — 2 Percent`,category.lead,`https://www.2pctstudio.com/work/${key}/`,'../../',key));
  urls.push(`https://www.2pctstudio.com/work/${key}/`);
  category.images.forEach((project,index)=>{
    const slug=project.slug||`${slugify(project.title||project.company||'project')}-${index+1}`;
    const projectDir=path.join(categoryDir,slug); fs.mkdirSync(projectDir,{recursive:true});
    const title=project.title||project.company||`Project ${index+1}`;
    const description=project.summary||category.lead;
    fs.writeFileSync(path.join(projectDir,'index.html'),page(`${title} — ${category.title} — 2 Percent`,description,`https://www.2pctstudio.com/work/${key}/${slug}/`,'../../../',key,slug));
    urls.push(`https://www.2pctstudio.com/work/${key}/${slug}/`);
  });
}
const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url=>`  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(root,'sitemap.xml'),sitemap);
