import {LocalStorage} from './LocalStorage.js';
import '../scss/app.scss';

class App {
	start () {
		const local = new LocalStorage();
		console.log(local);
	}
}

const app = new App();
app.start();