import {StateController} from './modules/StateController';
import {Render} from './modules/Render';
import {LocalStorageController} from './modules/LocalStorageController';
import '../scss/main.scss';

window.addEventListener('load', () => {
	class App {
		localStorageName = 'cerApp'
		render = new Render();
		stateController = new StateController();
		localStorageController = new LocalStorageController(this.localStorageName);

		rootBlock = document.querySelector('#root-app');
		buttonAdd = this.rootBlock.getElementsByClassName('btn-add')[0];
		contentView =  this.rootBlock.getElementsByClassName('content-view')[0];
		cerList =  this.rootBlock.getElementsByClassName('cer-list')[0];
		cerListItems =  this.cerList.getElementsByClassName('item');

		handlerStorage = {
			buttonAdd: {
				handleEvent: this.buttonAddClickHandler.bind(this)
			},
			contentViewDrop: {
				handleEvent: this.contentViewDropHandler.bind(this)
			},
			contentViewDragover: {
				handleEvent: this.contentViewDragoverHandler.bind(this)
			},
			cerItem : {
				handleEvent: this.cerItemClickHandler.bind(this)
			}
		}

		appState = {
			fileDropMode: false
		}

		start () {
			this.initDefaultState();
			this.initApp();

			if (!this.localStorageController.isExist()) {
				this.localStorageController.create();
			}
		}

		initDefaultState () {
			this.stateController.setStateButtonAdd('active', this.buttonAdd);
			this.stateController.setStateContentView('empty', this.contentView);
			this.stateController.setStateCerList('active', this.cerList);
		}

		initApp () {
			this.addInitListeners();
			this.getItemsInLocalStorage();
		}

		getItemsInLocalStorage () {
			const localStorageArray = this.localStorageController.getData();

			if (localStorageArray.length !== 0) {
				for (const dataItem of localStorageArray) {
		
					this.render.showCerItem(dataItem, this.cerList, (renderedElement) => {
						this.stateController.setStateCerItem('not-active', renderedElement);
						renderedElement.addEventListener('click', this.handlerStorage.cerItem);
					});
				}
			}
		}

		addInitListeners () {
			this.buttonAdd.addEventListener('click', this.handlerStorage.buttonAdd);
		}

		buttonAddClickHandler () {
			if (this.stateController.getState(this.buttonAdd) === 'active') {
				this.appState.fileDropMode = true;
				this.stateController.setStateCerList('not-active', this.cerList);
				this.stateController.setStateButtonAdd('not-active', this.buttonAdd);
				this.stateController.setStateContentView('drop', this.contentView);

				this.contentView.addEventListener('dragover', this.handlerStorage.contentViewDragover, false);
				this.contentView.addEventListener('drop', this.handlerStorage.contentViewDrop, false);
	
			} else if (this.stateController.getState(this.buttonAdd) === 'not-active') {
				this.appState.fileDropMode = false;
				this.stateController.setStateCerList('active', this.cerList);
				this.stateController.setStateButtonAdd('active', this.buttonAdd);
				this.stateController.setStateContentView('empty', this.contentView);

				this.contentView.removeEventListener('dragover', this.handlerStorage.contentViewDragover, false);
				this.contentView.removeEventListener('drop', this.handlerStorage.contentViewDrop, false);
			}
		}

		cerItemClickHandler (event) {
			if (this.appState.fileDropMode === false && this.stateController.getState(event.currentTarget) !== 'active') {
				console.log(event.currentTarget);

				this.stateController.setStateForAllCerItem('not-active', this.cerListItems);
				this.stateController.setStateCerItem('active', event.currentTarget);

				this.stateController.setStateContentView('filled', this.contentView);
				const dataItem = this.localStorageController.getItem(event.currentTarget.getAttribute('data-id'));
				this.render.showContentView(dataItem.content, this.contentView);
			}
		}

		contentViewDropHandler (event) {
			event.preventDefault()
			const file = event.dataTransfer.files;
			const data = {
				id: Math.random().toString(36).substr(2, 5),
				name: "SADSA",
				content: '1212'
			}

			this.localStorageController.addItem(data);

			this.render.showCerItem(data, this.cerList, (renderedElement) => {
				this.stateController.setStateCerItem('not-active', renderedElement);
				renderedElement.addEventListener('click', this.handlerStorage.cerItem);
			});
		}
	
		contentViewDragoverHandler (event) {
			event.preventDefault()
		}
	}

	const app = new App();
	app.start();
});
