class ArgsCheck {

    isHtmlElement (element) {
		if (typeof element !== 'object'|| element === undefined ||  element === null) {
			return false;
		} else {
			return true;
		}
	}

	isHtmlCollection (collection) {
		if (typeof collection !== 'object'|| collection === undefined || collection.length === undefined || collection.length == 0) {
			return false;
		} else {
			return true;
		}
	}
}

export {ArgsCheck};