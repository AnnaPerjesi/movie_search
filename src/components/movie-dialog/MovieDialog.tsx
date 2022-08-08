import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Box,
  Grid,
} from "@mui/material";
import { inject, observer } from "mobx-react";
import React from "react";
import MainStore from "../../core/stores/MainStore";
import Cast from "./cast/Cast";
import Crew from "./crew/Crew";
import Genres from "./genres/Genres";
import Links from "./links/Links";

interface IProps {
  MainStore?: MainStore;
}

class MovieDialog extends React.Component<IProps> {
  render() {
    const { MainStore } = this.props;

    if (!MainStore.selectedMovie) return null;

    return (
      <Dialog
        open={MainStore.selectedMovie != null}
        onClose={() => MainStore.setSelectedMovieId(null)}
        className="movieDialog"
        maxWidth={"xl"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <div>{MainStore.selectedMovie?.name}</div>
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
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
              <Grid container item spacing={2}>
                <Grid xs={4}>
                  <div className="moviePoster">
                    <img
                      src={`${MainStore.selectedMovie.poster.small}`}
                      alt="movie poster"
                    />
                  </div>
                </Grid>

                <Grid xs={4}>
                  <Genres />

                  <Cast />
                </Grid>

                <Grid xs={4}>
                  <Links />

                  <Crew />
                </Grid>
              </Grid>

              <Grid container item spacing={2}>
                <Grid xs={12}>
                  <h2>Overview</h2>
                  <div>{MainStore.selectedMovie?.overview}</div>
                </Grid>
              </Grid>

              <Grid container item spacing={2}>
                <Grid xs={12}>
                  <h2>Overview from Wikipedia</h2>
                  {MainStore.selectedMovie?.wikipediaOverview}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }
}

export default inject("MainStore")(observer(MovieDialog));
