import { makeAutoObservable, toJS } from "mobx";

class MainStore {
  constructor() {
    makeAutoObservable(this, {});
  }
}
export default MainStore;
