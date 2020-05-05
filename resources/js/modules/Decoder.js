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

    decode (der) {
        this.errorView.innerText = '';

        try {
            const asn1 = ASN1.decode(der);
            //asn1.toDom()
        } catch (e) {
            showError(e);
        }
    }

    decodeText (val) {
        try {
            const der = this.reHex.test(val) ? Hex.decode(val) : Base64.unarmor(val);
            decode(der);
        } catch (e) {
            showError(e);
        }
    }
    
    decodeBinaryString (str) {
        let der;
        try {
            if (this.reHex.test(str)) {
                der = Hex.decode(str);
            } else if (Base64.re.test(str)) {
                der = Base64.unarmor(str);
            }  else{
                der = str;
                decode(der);
            }
        } catch (e) {
            showError('Cannot decode file.');
        }
    }

    read (file) {
        const reader = new FileReader();
        reader.onloadend = function () {
            if (reader.error) {
                showError(`Your browser couldn't read the specified file (error code ${reader.error.code}).`);
            } else {
                decodeBinaryString(reader.result);
            }  
        };
        reader.readAsBinaryString(file);
    }   
}

export {Decoder};