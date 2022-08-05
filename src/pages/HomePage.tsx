import { Backdrop, CircularProgress } from "@mui/material";
import { inject, observer } from "mobx-react";
import React from "react";
import Movies from "../components/movies/Movies";
import SearchBox from "../components/search-box/SearchBox";
import MainStore, { IMovie } from "../core/stores/MainStore";
import "./Home.css";

interface IProps {
  MainStore?: MainStore;
}
class HomePage extends React.Component<IProps> {
  render() {
    const { MainStore } = this.props;
    if (MainStore.isLoading)
      return (
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={MainStore.isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      );
    return (
      <div className="homePage">
        <div className="header">
          <SearchBox />
        </div>

        <div>
          <Movies />
        </div>

        <h4>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB
        </h4>
      </div>
    );
  }
}

export default inject("MainStore")(observer(HomePage));
