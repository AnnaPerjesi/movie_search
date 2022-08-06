import { inject, observer } from "mobx-react";
import React from "react";
import CustomChip from "../../../controls/custom-chip/CustomChip";
import MainStore from "../../../core/stores/MainStore";

interface IProps {
  MainStore?: MainStore;
}

class Genres extends React.Component<IProps> {
  render() {
    const { MainStore } = this.props;

    if (
      !MainStore.selectedMovie.genres ||
      MainStore.selectedMovie.genres.length === 0
    ) {
      return (
        <div style={{ margin: "12px 0px" }}>No genre found for the movie</div>
      );
    }

    return (
      <div style={{ display: "flex" }}>
        {MainStore.selectedMovie.genres?.map((genre) => {
          const colorIndex = Math.floor(Math.random() * 6);
          return (
            <CustomChip
              label={`${genre.name}`}
              variant="outlined"
              colorIndex={colorIndex}
            />
          );
        })}
      </div>
    );
  }
}

export default inject("MainStore")(observer(Genres));
