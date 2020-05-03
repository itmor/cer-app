import {StateController} from './StateController.js';
import {LocalStorageController} from './LocalStorageController.js';
import '../scss/main.scss';

window.addEventListener('load', () => {
	class App {
		localStorageName = 'cerApp'
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

		start () {
			this.initDefaultState();
			this.initApp();

			if (!this.localStorageController.isExist()) {
				this.localStorageController.create();
			} else {
				this.localStorageController.addItem({
					id: 1212,
					name: "SADSA",
					content: '1212'
				});
				
				var s = this.localStorageController.getData();
				console.log(s)
			}
		}

		initDefaultState () {
			this.stateController.setStateButtonAdd('active', this.buttonAdd);
			this.stateController.setStateContentView('empty', this.contentView);
			this.stateController.setStateCerList('active', this.cerList);
			this.stateController.setStateForAllCerItem('not-active', this.cerListItems);
		}

		initApp () {
			this.addInitListeners();
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
		}
	
		contentViewDragoverHandler (event) {
			event.preventDefault()
		}
	}

	const app = new App();
	app.start();
});
