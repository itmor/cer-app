# CerApp


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Application for viewing some fields of asn1 certificates.

  - format support.der .cer
  - storage in local storage
  - written in vanilla js
  - allows you to drag and drop files directly into the browser

#### Installation
```
git clone https://github.com/itmor/cer-app.git
```
```
cd cer-app/build
```
Open index.html in browser 

#### Installation for develop
```
git clone https://github.com/itmor/cer-app.git
```
```
cd cer-app
```
```
npm install
```


### Class Description
##### App
the main class in which the initialization is performed, the main code is written
###### StateController
the class whose methods describe the state change of an html element, the word "state" means the html style of an element.
###### Render
This is a class whose methods
must draw dynamic elements.
###### LocalStorageController
the class that manages the local storage, its methods allow you to write or read data in the format that is further used for rendering
###### Decoder
This class is used to decode certificates, analyze and search for the necessary keys.
It contacts ASN1.js service.
###### ArgsCheck
This class is used as an assistant for checking some incoming data.
