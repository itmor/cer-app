class LocalStorageController {
	
	constructor (storageName) {
		if (typeof storageName !== 'string') {
			throw new Error ('Vault storage name is not a string');
		} else {
			this.storageName = storageName;
		}	
	}

	isExist () {
		if (localStorage[this.storageName] !== undefined) {
			return true;
		} else {
			return false;
		}
	}

	create () {
		if (this.isExist()) {
			throw new Error(`${this.storageName} already exists, first delete`)
		} else {
			localStorage[this.storageName] = '[]';
		}
		
	}

	remove () {
		if (!this.isExist()) {
			throw new Error(`${this.storageName} it was deleted before the call.`)
		} else {
			localStorage.removeItem(this.storageName);
		}
	}

	getData () {
		if (!this.isExist()) {
			throw new Error(`Unable to get data "${this.storageName}" storage has been deleted or not yet created.`);
		} else {
			const stringData = localStorage[this.storageName];
			const result = JSON.parse(stringData);
			
			return result;
		}
	}

	getItem (id) {
		if (!this.isExist()) {
			throw new Error(`Unable to get data "${this.storageName}" storage has been deleted or not yet created.`);
		} else {
			const stringData = localStorage[this.storageName];
			const result = JSON.parse(stringData);
	
			for (const item of result) {
				if (item.id === id) {
					return item;
				}
			}
	
			return 'not-found';
		}
	}

	addItem (data) {
		if (!this.isExist()) {
			throw new Error(`Unable to get data "${this.storageName}" storage has been deleted or not yet created.`);
		} else {
			if (typeof data === 'object' &&
				typeof data.id === 'number' &&
				typeof data.name === 'string' &&
				typeof data.content === 'string') {

				const item = {
					id: data.id,
					name: data.name,
					content: data.content
				}

				const localStorageArray = JSON.parse(localStorage[this.storageName]);
				localStorageArray.push(item);
				
				const localStorageString = JSON.stringify(localStorageArray);
				localStorage[this.storageName] = localStorageString;
			} else {
				throw new Error('Error adding item to local storage, invalid input')
			}
		}
	}
 }

export {LocalStorageController};