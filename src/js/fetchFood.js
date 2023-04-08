import Notiflix from 'notiflix';
import axios from 'axios';

export class fetchImg {
  #URL = 'https://pixabay.com/api/';
  #KEY = '34935251-caa237a886f8fd2167ae0727c';
  value = null;
  count = 1;
  btnTop = 0;
  async makeFetch() {
    try {
      return await axios.get(
        `${this.#URL}?key=${this.#KEY}&q=${
          this.value
        }&image_type=photo&orientation=horizontal&safesearch=true&page=${
          this.count
        }&per_page=40`
      );
    } catch (err) {
      throw new Error(err.message);
    }
  }
  makeMarkup(value) {
    return value
      .map(e => {
        return `<li class="list_item"><a href="${e.webformatURL}"><img src="${e.largeImageURL}" alt=""></a></li> `;
      })
      .join('');
  }
  notice() {
    Notiflix.Notify.success(`Page number ${this.count}`, {
      timeout: 2000,
    });
  }
  noticeFeil() {
    Notiflix.Notify.failure(`Please, enter other data`, {
      timeout: 2000,
    });
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

