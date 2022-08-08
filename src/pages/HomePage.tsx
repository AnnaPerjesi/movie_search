import { Backdrop, CircularProgress, Paper } from "@mui/material";
import { inject, observer } from "mobx-react";
import React from "react";
import Footer from "../components/footer/Footer";
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
          }}
        >
          <div>
            <Movies />
          </div>
        </Paper>

        <Footer />
      </div>
    );
  }
}

export default inject("MainStore")(observer(HomePage));
