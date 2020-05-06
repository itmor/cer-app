import { StateController } from './modules/StateController';
import { Render } from './modules/Render';
import { LocalStorageController } from './modules/LocalStorageController';
import { Decoder } from './modules/Decoder';
import '../scss/main.scss';

window.addEventListener('load', () => {
  class App {
    localStorageName = 'cerApp';
    render = new Render();
    stateController = new StateController();
    localStorageController = new LocalStorageController(this.localStorageName);
    rootBlock = document.querySelector('#root-app');
    errorView = this.rootBlock.getElementsByClassName('error-view')[0];
    hiddenView = this.rootBlock.getElementsByClassName('hidden-view')[0];
    decoder = new Decoder(this.errorView, this.hiddenView);
    buttonAdd = this.rootBlock.getElementsByClassName('btn-add')[0];
    contentView = this.rootBlock.getElementsByClassName('content-view')[0];
    cerList = this.rootBlock.getElementsByClassName('cer-list')[0];
    cerListItems = this.cerList.getElementsByClassName('item');

    handlerStorage = {
      buttonAdd: {
        handleEvent: this.buttonAddClickHandler.bind(this),
      },
      contentViewDrop: {
        handleEvent: this.contentViewDropHandler.bind(this),
      },
      contentViewDragover: {
        handleEvent: this.contentViewDragoverHandler.bind(this),
      },
      cerItem: {
        handleEvent: this.cerItemClickHandler.bind(this),
      },
    };

    appState = {
      fileDropMode: false,
      emptyProject: null,
    };

    start() {
      if (!this.localStorageController.isExist()) {
        this.localStorageController.create();
      }

      this.initDefaultState();
      this.initApp();
    }

    initDefaultState() {
      this.stateController.setStateButtonAdd('active', this.buttonAdd);
      this.stateController.setStateContentView('empty', this.contentView);
      this.stateController.setStateCerList('active', this.cerList);
    }

    initApp() {
      this.addInitListeners();
      this.getItemsInLocalStorage();
    }

    getItemsInLocalStorage() {
      const localStorageArray = this.localStorageController.getData();

      if (localStorageArray.length !== 0) {
        this.appState.emptyProject = false;

        for (const dataItem of localStorageArray) {
          this.render.showCerItem(dataItem, this.cerList, renderedElement => {
            this.stateController.setStateCerItem('not-active', renderedElement);
            renderedElement.addEventListener(
              'click',
              this.handlerStorage.cerItem
            );
          });
        }
      } else {
        this.appState.emptyProject = true;
        this.buttonAdd.click();
      }
    }

    addInitListeners() {
      this.buttonAdd.addEventListener('click', this.handlerStorage.buttonAdd);
    }

    buttonAddClickHandler() {
      if (this.stateController.getState(this.buttonAdd) === 'active') {
        if (this.appState.emptyProject === true) {
          this.stateController.setStateCerList('disable', this.cerList);
        } else {
          this.stateController.setStateCerList('not-active', this.cerList);
          this.stateController.setStateForAllCerItem(
            'not-active',
            this.cerListItems
          );
        }

        this.appState.fileDropMode = true;
        this.stateController.setStateButtonAdd('not-active', this.buttonAdd);
        this.stateController.setStateContentView('drop', this.contentView);
        this.contentView.addEventListener(
          'dragover',
          this.handlerStorage.contentViewDragover,
          false
        );
        this.contentView.addEventListener(
          'drop',
          this.handlerStorage.contentViewDrop,
          false
        );
      } else if (
        this.stateController.getState(this.buttonAdd) === 'not-active'
      ) {
        if (this.appState.emptyProject === false) {
          this.errorView.innerText = '';
          this.stateController.setStateCerList('active', this.cerList);
          this.appState.fileDropMode = false;
          this.stateController.setStateButtonAdd('active', this.buttonAdd);
          this.stateController.setStateContentView('empty', this.contentView);
          this.contentView.removeEventListener(
            'dragover',
            this.handlerStorage.contentViewDragover,
            false
          );
          this.contentView.removeEventListener(
            'drop',
            this.handlerStorage.contentViewDrop,
            false
          );
        }
      }
    }

    cerItemClickHandler(event) {
      if (
        this.appState.fileDropMode === false &&
        this.stateController.getState(event.currentTarget) !== 'active'
      ) {
        this.stateController.setStateForAllCerItem(
          'not-active',
          this.cerListItems
        );

        this.stateController.setStateCerItem('active', event.currentTarget);
        this.stateController.setStateContentView('filled', this.contentView);

        const dataItem = this.localStorageController.getItem(
          event.currentTarget.getAttribute('data-id')
        );
        this.render.showContentView(dataItem.content, this.contentView);
      }
    }

    contentViewDropHandler(event) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];

      this.decoder.read(file, data => {
        this.localStorageController.addItem(data);
        this.render.showCerItem(data, this.cerList, renderedElement => {
          this.appState.emptyProject = false;
          this.stateController.setStateCerList('not-active', this.cerList);
          this.errorView.innerText = '';
          this.stateController.setStateCerItem('not-active', renderedElement);
          renderedElement.addEventListener(
            'click',
            this.handlerStorage.cerItem
          );
        });
      });
    }

    contentViewDragoverHandler(event) {
      event.preventDefault();
    }
  }

  const app = new App();
  app.start();
});
