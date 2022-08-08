import { Close } from "@mui/icons-material";
import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
} from "@mui/material";
import { inject, observer } from "mobx-react";
import React from "react";
import MovieDialog from "../components/movie-dialog/MovieDialog";
import Movies from "../components/movies/Movies";
import SearchBox from "../components/search-box/SearchBox";
import MainStore from "../core/stores/MainStore";
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
        <MovieDialog />

        <div className="header">
          <SearchBox />
        </div>

        <Paper
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: "80%",
            flexGrow: 1,
            top: 34,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
        >
          <div>
            <Movies />
          </div>

          <h4>
            This product uses the TMDB API but is not endorsed or certified by
            TMDB
          </h4>
        </Paper>
      </div>
    );
  }
}

export default inject("MainStore")(observer(HomePage));
