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
        this.parseData(result, callBack);
        
    }

    parseData (data, callBack) {
        const organizationCenterCommonName = data.match(/commonName.*?UTF8String\s+(.*?)\s(\s\s)/)[1];
        data = data.replace(/commonName.*?UTF8String\s+(.*?)\s(\s\s)/, '');

        const subjectCommonName = data.match(/commonName.*?UTF8String\s+(.*?)\s(\s\s)/)[1];
        const validFrom = data.match(/UTCTime\s(.*?)(.*?)\sUTC/)[2];
        
        data = data.replace(/UTCTime\s(.*?)(.*?)\sUTC/, '');
        const validTill = data.match(/UTCTime\s(.*?)(.*?)\sUTC/)[2];
        

        callBack({
            id: Math.random().toString(36).substr(2, 5),
            name: subjectCommonName,
            content: `Common Name: ${subjectCommonName}
                      Issuer CN: ${organizationCenterCommonName}
                      Valid from: ${validFrom.split(' ')[0]}
                      Valid till: ${validTill.split(' ')[0]}`
                      
        });
    }

    decode (der, callBack) {
        this.errorView.innerText = '';

        try {
            const asn1 = ASN1.decode(der);
            if (asn1.typeName() != 'SEQUENCE') {
                const errorText = 'Неверная структура конверта сертификата (ожидается SEQUENCE)';
                this.showError(errorText);
                throw new Error(errorText);
            }
            
            setTimeout(() => {
                this.hiddenView.appendChild(asn1.toDOM());
            }, 0);

            setTimeout(() => {
                this.parseString(callBack);
            }, 0);

        } catch (e) {
            this.showError(e);
            throw new Error(e);
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
            this.showError(e);
            throw new Error(e);
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