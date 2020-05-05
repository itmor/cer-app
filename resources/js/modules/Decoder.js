import {ArgsCheck} from '../modules/ArgsCheck';
const argsCheck = new ArgsCheck();

class Decoder {
    reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
    
    constructor (errorView, hiddenView) {
        if (argsCheck.isHtmlElement(errorView) && argsCheck.isHtmlElement(hiddenView) ) {
            this.errorView = errorView;
            this.hiddenView = hiddenView;
        }
    }

    showError (string) {
        this.errorView.innerText = string;
    }

    parseString (callBack) {
        let result = this.hiddenView.textContent;
        this.hiddenView.innerHTML = '';
        // result = result.replace(/SEQUENCE/g, '');
        // result = result.replace(/Offset:/g, '');
        // result = result.replace(/SET/g, '');
        // result = result.replace(/Value:/g, '');
        callBack(result);
        
    }

    decode (der, callBack) {
        this.errorView.innerText = '';

        try {
            const asn1 = ASN1.decode(der);

            setTimeout(() => {
                this.hiddenView.appendChild(asn1.toDOM());
            }, 0);

            setTimeout(() => {
                this.parseString(callBack);
            }, 0);

        } catch (e) {
            this.showError(e);
        }
    }
    
    decodeBinaryString (str, callBack) {
        let der;
        try {
            if (this.reHex.test(str)) {
                der = Hex.decode(str);
            } else if (Base64.re.test(str)) {
                der = Base64.unarmor(str);
            }  else{
                der = str;
                this.decode(der, callBack);
            }
        } catch (e) {
            this.showError('Cannot decode file.');
        }
    }

    read (file, callBack) {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.error) {
                this.showError(`Your browser couldn't read the specified file (error code ${reader.error.code}).`);
            } else {
                this.decodeBinaryString(reader.result, callBack);
            }  
        }

        reader.readAsBinaryString(file);
    }   
}

export {Decoder};