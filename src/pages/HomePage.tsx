import { Close } from "@mui/icons-material";
import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
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
          <Dialog
            open={MainStore.getSelectedMovie != null}
            onClose={() => MainStore.setSelectedMovieId(null)}
            className="movieDialog"
          >
            <DialogTitle sx={{ m: 0, p: 2 }}>
              <div>{MainStore.getSelectedMovie?.name}</div>
              <IconButton
                aria-label="close"
                onClick={() => MainStore.setSelectedMovieId(null)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              {MainStore.getSelectedMovie?.overview}
            </DialogContent>
          </Dialog>
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
