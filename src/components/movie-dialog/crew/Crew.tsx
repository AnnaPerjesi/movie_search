import { inject, observer } from "mobx-react";
import React from "react";
import MainStore from "../../../core/stores/MainStore";

interface IProps {
  MainStore?: MainStore;
}

class Crew extends React.Component<IProps> {
  render() {
    const { MainStore } = this.props;

    return (
      <React.Fragment>
        <h2>Crew:</h2>
        {MainStore.selectedMovie.crew?.map((c) => {
          return (
            <div className="personList">
              {c.person.name} <i>({c.role.job})</i>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default inject("MainStore")(observer(Crew));
