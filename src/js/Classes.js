import Notiflix from 'notiflix';
import axios from 'axios';

export class fetchImg {
  #URLimg = 'https://pixabay.com/api/';
  #URLvideo = 'https://pixabay.com/api/videos/';
  value = null;
  page = 1;
  async makeFetch() {
    try {
      return await axios.get(`${this.#URLimg}?`, {
        params: {
          key: '34935251-caa237a886f8fd2167ae0727c',
          q: this.value,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: this.page,
          per_page: 40,
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async makeFetchVideo() {
    try {
      return await axios.get(`${this.#URLvideo}?`, {
        params: {
          key: '34935251-caa237a886f8fd2167ae0727c',
          q: this.value,
          video_type: 'all',
          orientation: 'horizontal',
          safesearch: true,
          page: this.page,
          per_page: 10,
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
  makeIncrement() {
    return (this.page += 1);
  }
}

const fetchUrl = new fetchImg();
export class utilsImg {
  btnTop = 0;
  valueCheckbox = false;

  makeMarkup(value) {
    return value
      .map(e => {
        return `<li class="list_item"><a href="${e.webformatURL}"><img src="${e.largeImageURL}" alt=""></a></li> `;
      })
      .join('');
  }

  markupForVideo(value) {
    return value
      .map(e => {
        return `<li class="photo-card"> 
        <video poster="${e.userImageURL}"  controls>
        <source src="${e.videos.medium.url}" type="video/mp4"> 
        </video>
      <div class="info">
      <p class="info-item">
        <b>Likes</b>${e.likes}
      </p>
      <p class="info-item">
        <b>Views</b>${e.views}
      </p>
      <p class="info-item">
        <b>Comments</b>${e.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${e.downloads}
      </p>
    </div></li>`;
      })
      .join('');
  }
  notice(value) {
    Notiflix.Notify.success(`Page number ${value}`, {
      timeout: 2000,
    });
  }
  noticeFeil() {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
      {
        timeout: 2000,
      }
    );
  }
  blockBtn(x, y) {
    x.setAttribute('disabled', 'disabled');
    y.setAttribute('disabled', 'disabled');
  }
  remblockBtn(x, y) {
    x.removeAttribute('disabled');
    y.removeAttribute('disabled');
  }
}
