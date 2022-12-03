import './news.css';
import { Article } from '../../types/articles.types';

class News {
    draw(data: Readonly<Article[]>) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as Element;
            if (idx % 2) {
                const newsItem = newsClone.querySelector('.news__item');
                newsItem?.classList.add('alt');
            }
            const newsPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (newsPhoto) {
                newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'mg/news_placeholder.webp'})`;
            }
            const newsAuthor = newsClone.querySelector('.news__meta-author');
            if (newsAuthor) {
                newsAuthor.textContent = item.author || item.source.name;
            }
            const newsDate = newsClone.querySelector('.news__meta-date');
            if (newsDate) {
                newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }
            const newsTitle = newsClone.querySelector('.news__description-title');
            if (newsTitle) {
                newsTitle.textContent = item.title;
            }
            const newsDescriptionSource = newsClone.querySelector('.news__description-source');
            if (newsDescriptionSource) {
                newsDescriptionSource.textContent = item.source.name;
            }
            const newsDescriptionContent = newsClone.querySelector('.news__description-content');
            if (newsDescriptionContent) {
                newsDescriptionContent.textContent = item.description;
            }
            const newsLinks = newsClone.querySelector('.news__read-more a');
            if (newsLinks) {
                newsLinks.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });
        const newsWrapper = document.querySelector('.news');
        if (newsWrapper) {
            newsWrapper.innerHTML = '';
            newsWrapper.appendChild(fragment);
        }
    }
}

export default News;
