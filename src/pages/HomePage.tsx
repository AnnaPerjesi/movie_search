import { Search } from "@mui/icons-material";
import { Paper, IconButton, InputBase, Divider } from "@mui/material";
import { inject, observer } from "mobx-react";
import React from "react";
import MainStore, { IMovie } from "../core/stores/MainStore";
import "./Home.css";

interface IProps {
  MainStore?: MainStore;
}
class HomePage extends React.Component<IProps> {
  render() {
    const { MainStore } = this.props;
    if (MainStore.isLoading) return <div>Loading...</div>;
    return (
      <div className="homePage">
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

        {MainStore.movies?.map((movie: IMovie) => {
          return (
            <div key={movie.id}>
              {movie.id} - {movie.name}
            </div>
          );
        })}
      </div>
    );
  }
}

export default inject("MainStore")(observer(HomePage));
