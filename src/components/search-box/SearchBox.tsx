import { Search } from "@mui/icons-material";
import { Paper, InputBase, IconButton } from "@mui/material";
import { inject, observer } from "mobx-react";
import React from "react";
import MainStore from "../../core/stores/MainStore";

interface IProps {
  MainStore?: MainStore;
}

class SeacrhBox extends React.Component<IProps> {
  render() {
    const { MainStore } = this.props;

    return (
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search moovie"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={(e) => {
            MainStore.onChangeInput(e.target.value);
          }}
          value={MainStore.query || ""}
        />
        <IconButton
          type="submit"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => {
            MainStore.searchMovies();
          }}
        >
          <Search />
        </IconButton>
      </Paper>
    );
  }
}

export default inject("MainStore")(observer(SeacrhBox));
