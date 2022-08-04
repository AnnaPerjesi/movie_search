import React from "react";
import "./App.css";
import { Provider } from "mobx-react";
import MainStore from "./core/stores/MainStore";
import HomePage from "./pages/HomePage";
import { gql, useQuery } from "@apollo/client";

interface IStore {
  MainStore: MainStore;
}

interface IProps {}

class App extends React.Component<IProps> {
  private stores: IStore = null;

  constructor(props: IProps) {
    super(props);

    this.stores = {
      MainStore: new MainStore(),
    };
  }

  render() {
    return (
      <Provider {...this.stores}>
        <HomePage />
      </Provider>
    );
  }
}

export default App;
