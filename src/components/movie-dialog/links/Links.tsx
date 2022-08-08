import { inject, observer } from "mobx-react";
import React from "react";
import MainStore from "../../../core/stores/MainStore";
import "./Links.css";

interface IProps {
  MainStore?: MainStore;
}

class Links extends React.Component<IProps> {
  render() {
    const { MainStore } = this.props;

    return (
      <div className="container">
        <div className="linkContainer">
          <a
            className="customLink"
            target="_blank"
            href={`https://en.wikipedia.org/wiki/${MainStore.selectedMovie?.name}`}
          >
            Click here for Wikipedia
          </a>
        </div>

        <div className="linkContainer">
          <a
            className="customLink"
            target="_blank"
            href={`https://www.imdb.com/title/${MainStore.selectedMovie?.IMBDId}`}
          >
            Click here for IMBD
          </a>
        </div>

        <div className="linkContainer">Similar films</div>
      </div>
    );
  }
}

export default inject("MainStore")(observer(Links));
