import {ArgsCheck} from '../modules/ArgsCheck';
const argsCheck = new ArgsCheck();

class Render {
    showCerItem (data, renderTo, callBack) {
	    if (typeof data === 'object' &&
	        typeof data.id === 'string' &&
	        typeof data.name === 'string' && argsCheck.isHtmlElement(renderTo)) {

	        const template = `
	            <div class="item" data-id="${data.id}">
	                <span class="text">${data.name}</span>
	                <span class="icon">▶</span>
	            </div>`;

	        let item = document.createElement('DIV');
	        item.innerHTML = template;
	        item = item.querySelector('.item');
	        renderTo.append(item);
	        callBack(item);
	    } else {
	        throw new Error('Error render to local storage, invalid input data');
	    }
    }
    
    showContentView (data, renderTo, callBack) {
        if(argsCheck.isHtmlElement(element) && typeof data === 'string') {
            renderTo.innerText = data;
        } else {
            throw new Error('Error render to local storage, invalid input data');
        }
    }
}

export {Render};