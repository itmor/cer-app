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
				handleEvent: this.buttonAddHandler.bind(this)
			},
			contentViewDrop: {
				handleEvent: this.contentViewDropHandler.bind(this)
			},
			contentViewDragover: {
				handleEvent: this.contentViewDragoverHandler.bind(this)
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
					});
				}
			}
		}

		addInitListeners () {
			this.buttonAdd.addEventListener('click', this.handlerStorage.buttonAdd);
		}

		buttonAddHandler () {
			if (this.stateController.getState(this.buttonAdd) === 'active') {
				this.stateController.setStateButtonAdd('not-active', this.buttonAdd);
				this.stateController.setStateContentView('drop', this.contentView);

				this.contentView.addEventListener('dragover', this.handlerStorage.contentViewDragover, false);
				this.contentView.addEventListener('drop', this.handlerStorage.contentViewDrop, false);
	
			} else if (this.stateController.getState(this.buttonAdd) === 'not-active') {
				this.stateController.setStateButtonAdd('active', this.buttonAdd);
				this.stateController.setStateContentView('empty', this.contentView);
				this.contentView.removeEventListener('dragover', this.handlerStorage.contentViewDragover, false);
				this.contentView.removeEventListener('drop', this.handlerStorage.contentViewDrop, false);
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
			});
		}
	
		contentViewDragoverHandler (event) {
			event.preventDefault()
		}
	}

	const app = new App();
	app.start();
});
