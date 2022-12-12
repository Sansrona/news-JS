import './sources.css';
import { Source } from '../../types/sources.types';
class Sources {
    draw(data: Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
            const sourceItem = sourceClone.querySelector('.source__item');
            if (sourceItem) {
                sourceItem.setAttribute('data-source-id', item.id);
            }
            const sourceItemName = sourceClone.querySelector('.source__item-name');
            if (sourceItemName) {
                sourceItemName.textContent = item.name;
            }

            fragment.append(sourceClone);
        });
        const sourceWrapper = document.querySelector('.sources');
        if (sourceWrapper) {
            sourceWrapper.innerHTML = '';
            sourceWrapper.append(fragment);
        }
    }
}

export default Sources;
