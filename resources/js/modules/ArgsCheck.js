class ArgsCheck {

    isHtmlElement (element) {
		if (typeof element === 'object' && element !== null) {
			return true;
		} else {
			return false;
		}
	}

	isHtmlCollection (collection) {
		if (typeof collection === 'object' && collection.length !== undefined && collection.length !== 0) {
			return true;
		} else {
			return false;
		}
	}
}

export {ArgsCheck};