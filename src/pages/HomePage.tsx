import { inject, observer } from "mobx-react";
import React from "react";
import MainStore from "../stores/MainStore";
import "./Home.css";

interface IProps {
  MainStore?: MainStore;
}
class HomePage extends React.Component<IProps> {
  render() {
    const { MainStore } = this.props;

    return <div className="homePage">Cicc</div>;
  }
}

export default inject("MainStore")(observer(HomePage));
