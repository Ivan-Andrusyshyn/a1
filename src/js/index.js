import { fetchImg } from './Classes';
import { utilsImg } from './Classes';
let debounce = require('lodash.debounce');
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const DEBOUNCE_DELAY = 400;

const divC = document.querySelector('.gallery');
const enterData = document.querySelector('input');
const newBtn = document.querySelector('.btn_new');
const backBtn = document.querySelector('.btn_back');
const btnTop = document.querySelector('.btn_top');
const radioBtn = document.querySelector('[type="checkbox"]');

radioBtn.addEventListener('click', switchImgVideo);
document.addEventListener('scroll', makeOnScroll);
newBtn.addEventListener('click', debounce(newGallary, DEBOUNCE_DELAY));
backBtn.addEventListener('click', debounce(oldGallary, DEBOUNCE_DELAY));
enterData.addEventListener('input', debounce(searchOnEnter, DEBOUNCE_DELAY));
btnTop.addEventListener('click', () => {
  utilFunction.btnTop = 0;
  return;
});

let lightbox = new SimpleLightbox('.gallery a', {});

const proto = new fetchImg();
const utilFunction = new utilsImg();

function newGallary() {
  heightMax();
  if (proto.page === 13) return;
  cleanHtml();
  proto.makeIncrement();
  switchChecked();
  utilFunction.notice(proto.page);
}

function oldGallary() {
  if (proto.page === 1) {
    return;
  }
  cleanHtml();
  proto.page -= 1;
  switchChecked();

  utilFunction.notice(proto.page);
}

function searchOnEnter(e) {
  cleanHtml();
  proto.value = e.target.value.trim();
  if (proto.value == '') {
    proto.value = '';
    utilFunction.blockBtn(backBtn, newBtn);
    return;
  }
  proto.page = 1;
  switchChecked();
  utilFunction.remblockBtn(backBtn, newBtn);
}
function switchChecked() {
  if (utilFunction.valueCheckbox === true) {
    expVideo();
    return;
  }
  exp();
}

async function exp() {
  try {
    const { data } = await proto.makeFetch();
    console.log(data);
    if (data.hits.length < 1) {
      utilFunction.noticeFeil(proto.page);
      return;
    }
    newImgAndVideo(data.hits);
  } catch (err) {
    console.log(err);
  }
}
async function expVideo() {
  try {
    const { data } = await proto.makeFetchVideo();
    console.log(data);
    if (data.hits.length < 1) {
      utilFunction.noticeFeil(proto.page);
      return;
    }
    newImgAndVideo(data.hits);
  } catch (err) {
    console.log(err);
  }
}
function switchImgVideo(e) {
  utilFunction.valueCheckbox = e.target.checked;
  cleanHtml();
  enterData.value = '';
  proto.page = 1;
}
function newImgAndVideo(value) {
  if (utilFunction.valueCheckbox === true) {
    divC.insertAdjacentHTML('afterbegin', utilFunction.markupForVideo(value));
    return;
  }
  divC.insertAdjacentHTML('afterbegin', utilFunction.makeMarkup(value));
  lightbox.refresh();
}
function cleanHtml() {
  divC.innerHTML = ' ';
}
function heightMax() {
  let hScreen = newBtn.getBoundingClientRect();
  const { height: cardHeight } = hScreen;
  window.scrollBy({
    top: cardHeight * 4,
    behavior: 'smooth',
  });
}
function makeOnScroll() {
  utilFunction.btnTop = newBtn.getBoundingClientRect().top;
  btnTop.classList.add('is-hidden');
  if (newBtn.getBoundingClientRect().top < -2000) {
    btnTop.classList.remove('is-hidden');
  }
}
