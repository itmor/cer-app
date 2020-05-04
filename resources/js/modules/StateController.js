import {ArgsCheck} from '../modules/ArgsCheck';
const argCheck = new ArgsCheck();

class StateController {

	getState (element) {
 		if (element.classList.length > 2) {
			const stateArray = [];

			for(const i = 1; i < element.classList.length; i++) {
				stateArray.push(element.classList[i]);
			}

			return stateArray;
		} else if (element.classList.length == 1) {
			return 'disable';
		} else {
			return element.classList[1];
		}
	}

	getStateForAll (collection) {
		if(!argCheck.isHtmlCollection(collection)) {
			throw new Error('HTML collection was not transferred or it is empty');
		} 

		const resultArray = [];

		for(const element of collection) {
			resultArray.push({element: element, state: this.getState(element)})
		}

		return resultArray;
	}

	setStateForAllCerItem (state, collection) {
		if(!argCheck.isHtmlCollection(collection)) {
			throw new Error('HTML collection was not transferred or it is empty');
		} 

		for(const element of collection) {
			this.setStateCerItem(state, element)
		}
	}

	setStateCerItem (state, element) {
		if(!argCheck.isHtmlElement(element)) {
			throw new Error('HTML element was not passed.');
		} 

		element.className = element.classList[0];

		switch(state) {
			case 'disable': 
				break;

			case 'active': 
				element.classList.add(state);
				break;

			case 'not-active': 
				element.classList.add(state);
				break;

			default:
				throw new Error(`State ${state} does not exist.`);
		}
		
	}

	setStateCerList (state, element) {
		if(!argCheck.isHtmlElement(element)) {
			throw new Error('HTML element was not passed.');
		} 

		element.className = element.classList[0];

		switch(state) {
			case 'disable': 
				break;

			case 'active': 
				element.classList.add(state);
				break;
			
			case 'not-active': 
				element.classList.add(state);
				break;

			default:
				throw new Error(`State ${state} does not exist.`);
		}
	}
	
	setStateContentView (state, element) {
		if(!argCheck.isHtmlElement(element)) {
			throw new Error('HTML element was not passed.');
		} 
		
		element.className = element.classList[0];

		const emptyStateText = 'Выберите сертификат для просмотра информации';
		const dropStateText = 'Перетащите файл сертификата в это поле';

		switch(state) {
			case 'disable': 
				break;

			case 'empty': 
				element.classList.add(state);
				element.innerText = emptyStateText;
				break;

			case 'drop':
				element.classList.add(state);
				element.innerText = dropStateText;
				break;
				
			case 'filled':
				element.classList.add(state);
				break;

			default:
				throw new Error(`State ${state} does not exist.`);
		}
	}

	setStateButtonAdd (state, element) {
		if(!argCheck.isHtmlElement(element)) {
			throw new Error('HTML element was not passed.');
		} 

		element.className = element.classList[0];

		const activeStateText = 'Добавить';
		const notActiveStateText = 'Отменить';

		switch(state) {
			case 'disable': 
				break;

			case 'active': 
				element.classList.add(state);
				element.innerText = activeStateText;
				break;

			case 'not-active':
				element.classList.add(state);
				element.innerText = notActiveStateText;
				break;

			default:
				throw new Error(`State ${state} does not exist.`);
		}
	}
}

export {StateController};