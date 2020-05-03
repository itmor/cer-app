import {StateController} from './StateController.js';
import '../scss/main.scss';

window.addEventListener('load', () => {
	class App {
		stateController = new StateController();

		start () {
			console.log(this.stateController.getStateContentView(),
			this.stateController.getStateButtonAdd(), this.stateController.getStateCerList(), this.stateController.getStateForAllCerItem(document.querySelectorAll('.cer-list .item')))
			
		}

		initState() {
			this.stateController.setStateButtonAdd('active');
			this.stateController.setStateContentView('empty');
			this.stateController.setStateCerList('active');
			this.stateController.setStateForAllCerItem('not-active', document.querySelectorAll('.cer-list .item'));
		}
	}

	const app = new App();
	app.initState();
	app.start();
});
