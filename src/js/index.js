import { fetchImg } from './Classes';
import { utilsImg } from './Classes';
let debounce = require('lodash.debounce');
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { elements } from './refs';

const DEBOUNCE_DELAY = 400;

elements.radioBtn.addEventListener('click', switchImgVideo);
document.addEventListener('scroll', makeOnScroll);
elements.newBtn.addEventListener('click', debounce(newGallary, DEBOUNCE_DELAY));
elements.backBtn.addEventListener(
  'click',
  debounce(oldGallary, DEBOUNCE_DELAY)
);
elements.enterData.addEventListener(
  'input',
  debounce(searchOnEnter, DEBOUNCE_DELAY)
);
elements.btnTop.addEventListener('click', () => {
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
  utilFunction.remblockBtn(elements.backBtn, elements.newBtn);
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
    elements.divC.insertAdjacentHTML(
      'afterbegin',
      utilFunction.markupForVideo(value)
    );
    return;
  }
  elements.divC.insertAdjacentHTML(
    'afterbegin',
    utilFunction.makeMarkup(value)
  );
  lightbox.refresh();
}
function cleanHtml() {
  elements.divC.innerHTML = ' ';
}
function heightMax() {
  let hScreen = elements.newBtn.getBoundingClientRect();
  const { height: cardHeight } = hScreen;
  window.scrollBy({
    top: cardHeight * 4,
    behavior: 'smooth',
  });
}
function makeOnScroll() {
  utilFunction.btnTop =elements.newBtn.getBoundingClientRect().top;
  elements.btnTop.classList.add('is-hidden');
  if (elements.newBtn.getBoundingClientRect().top < -2000) {
    elements.btnTop.classList.remove('is-hidden');
  }
}
