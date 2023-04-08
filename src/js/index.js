import { fetchImg } from './fetchFood';
let debounce = require('lodash.debounce');
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const DEBOUNCE_DELAY = 300;

const divC = document.querySelector('.gallery');
const enterData = document.querySelector('input');
const newBtn = document.querySelector('.btn_new');
const backBtn = document.querySelector('.btn_back');
const btnTop = document.querySelector('.btn_top');

document.addEventListener('scroll', makeOnScroll);
newBtn.addEventListener('click', debounce(newGallary, DEBOUNCE_DELAY));
backBtn.addEventListener('click', debounce(oldGallary, DEBOUNCE_DELAY));
enterData.addEventListener('input', debounce(searchOnEnter, DEBOUNCE_DELAY));
btnTop.addEventListener('click', () => {
  proto.btnTop = 0;
  return;
});
let lightbox = new SimpleLightbox('.gallery a', {});
const proto = new fetchImg();

function newGallary() {
  heightMax();
  if (proto.count === 13) return;
  cleanHtml();
  proto.count += 1;
  exp();
  proto.notice();
}
function makeOnScroll() {
  proto.btnTop = newBtn.getBoundingClientRect().top;
  btnTop.classList.add('is-hidden');
  console.log(proto.btnTop);
  if (newBtn.getBoundingClientRect().top < -2000) {
    btnTop.classList.remove('is-hidden');
  }
}

function oldGallary() {
  if (proto.count === 1) {
    return;
  }
  cleanHtml();
  proto.count -= 1;
  exp();
  proto.notice();
}

function searchOnEnter(e) {
  cleanHtml();
  proto.value = e.target.value.trim();
  if (proto.value == '') {
    proto.value = '';
    proto.blockBtn(backBtn, newBtn);

    return;
  }
  exp();
  proto.remblockBtn(backBtn, newBtn);
}

async function exp() {
  try {
    const { data } = await proto.makeFetch();
    if (data.hits.length < 1) {
      proto.noticeFeil();
      return;
    }
    newImg(data.hits);
  } catch (err) {
    console.log(err);
  }
}
function newImg(value) {
  divC.insertAdjacentHTML('afterbegin', proto.makeMarkup(value));
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
