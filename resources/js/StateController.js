class StateController {

	getState (element) {
		if(element === null || element === undefined || typeof element !== 'object' ||
		 typeof element.classList !== 'object' || element.classList.length === 0) {
			return 'none';
		} else if (element.classList.length > 2) {
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

	getStateForAllCerItem (elements) {
		if(typeof elements !== 'object'|| elements === undefined || elements.length === undefined || elements.length == 0) {
			throw new Error ('HTML collection was not transferred.');
		} 

		const resultArray = [];

		for(const element of elements) {
			resultArray.push({element: element, state: this.getState(element)})
		}

		return resultArray;

	}

	setStateForAllCerItem (state, elements) {
		if(typeof elements !== 'object'|| elements === undefined || elements.length === undefined || elements.length == 0) {
			throw new Error ('HTML collection was not transferred.');
		} 

		for(const element of elements) {
			this.setStateCerItem(state, element)
		}
	}

	getStateCerItem (element) {
		if(typeof element !== 'object'|| element === undefined) {
			throw new Error ('The HTML element was not passed to the controller to individually change the state of the element.');
		} 

		return this.getState(element);
	}

	setStateCerItem (state, element) {
		
		if(typeof element !== 'object'|| element === undefined) {
			throw new Error ('The HTML element was not passed to the controller to individually change the state of the element.');
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
				throw new Error (`State ${state} does not exist.`);
		}
		
	}

	getStateCerList () {
		const element = document.querySelector('#root-app .cer-list');
		return this.getState(element);
	}

	setStateCerList (state) {
		const element = document.querySelector('#root-app .cer-list');
		element.className = element.classList[0];

		switch(state) {
			case 'disable': 
				break;

			case 'active': 
				element.classList.add(state);
				break;

			default:
				throw new Error (`State ${state} does not exist.`);
		}
	}


	getStateContentView () {
		const element = document.querySelector('#root-app .content-view');
		return this.getState(element);
	}
	
	setStateContentView (state) {
		const element = document.querySelector('#root-app .content-view');
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
				throw new Error (`State ${state} does not exist.`);
		}
	}

	getStateButtonAdd () {
		const element = document.querySelector('#root-app .btn-add');
		return this.getState(element);
	}

	setStateButtonAdd (state) {
		const element = document.querySelector('#root-app .btn-add');
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
				throw new Error (`State ${state} does not exist.`);
		}
	}
}

export {StateController};