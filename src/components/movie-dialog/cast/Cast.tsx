import { inject, observer } from "mobx-react";
import React from "react";
import MainStore from "../../../core/stores/MainStore";

interface IProps {
  MainStore?: MainStore;
}

class Cast extends React.Component<IProps> {
  render() {
    const { MainStore } = this.props;

    return (
      <React.Fragment>
        <h2>Cast:</h2>
        {MainStore.selectedMovie.cast?.map((c) => {
          return (
            <div style={{ padding: "6px 4px" }}>
              <span style={{ color: "blue" }}>{c.person.name}</span> as{" "}
              <i>{c.role.character}</i>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default inject("MainStore")(observer(Cast));
