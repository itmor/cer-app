class LocalStorageController {
	
	constructor (storageName) {
		if (typeof storageName !== 'string') {
			throw new Error ('Vault storage name is not a string');
		} else {
			this.storageName = storageName;
		}	
	}

	check () {
		if (localStorage[this.storageName] !== undefined) {
			return true;
		} else {
			return false;
		}
	}

	create () {
		localStorage[this.storageName] = '[]';
	}

	remove () {
		localStorage.removeItem(this.storageName);
	}

	getItem (id) {
		const stringData = localStorage[this.storageName];
		const result = JSON.parse(stringData);

		for (const item of result) {
			if (item.id === id) {
				return item;
			}
		}

		return 'not-found';
	}

	addItem (data) {
		if (typeof data === 'object' &&
			typeof data.id === 'number' &&
			typeof data.name === 'string' &&
			typeof data.content === 'string') {

			const item = {
				id: data.id,
				name: data.name,
				content: data.content
			}

			const localArray = JSON.parse(localStorage[this.storageName]);
			localArray.push(item);
		} else {
			throw new Error('Error adding item to local storage, invalid input')
		}
	}
 }

export {LocalStorageController};