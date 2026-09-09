const config=window.SITE_CONTENT;
const projects=config.projects;
const order=Object.keys(projects);
const positions=order.map(key=>projects[key].imagePosition);
const dialog=document.querySelector('.case-dialog');
let activeProject=order[0];

function imageFor(item){return item.imageFile||config.portfolioImage}
function imageCss(file){return `url('${file}')`}

document.querySelectorAll('img[src="logo-2percent.png"]').forEach(image=>{image.src=config.brand.logo;image.alt=config.brand.name});
document.querySelectorAll('a[href^="mailto:"]').forEach(link=>{link.href=`mailto:${config.brand.email}?subject=New%20project%20inquiry`;if(link.classList.contains('contact-link'))link.childNodes[0].textContent=`${config.brand.email} `});

document.querySelectorAll('[data-project]').forEach(button=>{
  const key=button.dataset.project;
  const item=projects[key];
  const art=button.querySelector('.project-art');
  const name=button.querySelector('.project-meta b');
  const category=button.querySelector('.project-meta small');
  art.style.setProperty('--project-image',imageCss(imageFor(item)));
  art.style.setProperty('--project-size',item.imageFile?'cover':'300% 200%');
  art.style.setProperty('--project-position',item.imagePosition);
  name.textContent=item.title;
  category.textContent=item.category;
  button.addEventListener('click',()=>openProject(key));
});

function openProject(key){
  const item=projects[key];if(!item)return;
  const currentIndex=order.indexOf(key);
  activeProject=key;
  dialog.dataset.theme=key;
  dialog.style.setProperty('--project-image',imageCss(imageFor(item)));
  dialog.style.setProperty('--project-size',item.imageFile?'cover':'300% 200%');
  dialog.style.setProperty('--project-position',item.imagePosition);
  dialog.style.setProperty('--gallery-position-two',positions[(currentIndex+1)%positions.length]);
  dialog.style.setProperty('--gallery-position-three',positions[(currentIndex+2)%positions.length]);
  dialog.querySelector('.case-index').textContent=item.index;
  dialog.querySelector('#case-title').textContent=item.title;
  dialog.querySelector('.case-lead').textContent=item.lead;
  dialog.querySelector('.case-brief').textContent=item.brief;
  dialog.querySelector('.case-approach').textContent=item.approach;
  dialog.querySelector('.case-tags').innerHTML=item.tags.map(tag=>`<span>${tag}</span>`).join('');
  if(!dialog.open)dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.scrollTop=0;
}

dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
dialog.querySelector('.next-project').addEventListener('click',()=>openProject(order[(order.indexOf(activeProject)+1)%order.length]));
dialog.querySelector('.case-footer a').addEventListener('click',()=>dialog.close());

const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('nav');
const header=document.querySelector('.site-header');
let lastScroll=0;
toggle.addEventListener('click',()=>{const open=toggle.classList.toggle('active');nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu')});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.classList.remove('active');toggle.setAttribute('aria-expanded','false')}));
window.addEventListener('scroll',()=>{const current=window.scrollY;header.classList.toggle('hidden',current>lastScroll&&current>120);lastScroll=current},{passive:true});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
document.getElementById('year').textContent=new Date().getFullYear();
