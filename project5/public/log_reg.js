window.onload = () => {

const wrapper = document.querySelector('.wrapper');

const btnPopup = document.querySelector('.btnLogin-popup');
const iconCloses = document.querySelectorAll('.icon-close');
const body = document.querySelector('body');


btnPopup.addEventListener('click',()=>{
    wrapper.classList.add('active-popup');
    cookieImg.style.display = 'none';
    tagline.style.display = 'none';
    body.classList.add('box-background');
});

iconCloses.forEach(icon => {
    icon.addEventListener('click',()=>{
        wrapper.classList.remove('active-popup');
        wrapper.classList.remove('active');
        cookieImg.style.display = 'block';
        tagline.style.display = 'block';
        body.classList.remove('box-background');
    })
});
};
