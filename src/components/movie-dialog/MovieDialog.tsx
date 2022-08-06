import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Box,
  Grid,
  Chip,
} from "@mui/material";
import { inject, observer } from "mobx-react";
import React from "react";
import CustomChip from "../../controls/custom-chip/CustomChip";
import MainStore from "../../core/stores/MainStore";
import Cast from "./cast/Cast";
import Genres from "./genres/Genres";

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
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "12px", marginTop: "12px" }}>
                      <a
                        className="customLink"
                        target="_blank"
                        href={`https://en.wikipedia.org/wiki/${MainStore.selectedMovie?.name}`}
                      >
                        Click here for Wikipedia
                      </a>
                    </div>

                    <div style={{ margin: "12px" }}>
                      <a
                        className="customLink"
                        target="_blank"
                        href={`https://www.imdb.com/title/${MainStore.selectedMovie?.IMBDId}`}
                      >
                        Click here for IMBD
                      </a>
                    </div>

                    <div style={{ margin: "12px" }}>Similar films</div>
                  </div>
                  <h2>Crew:</h2>
                  {MainStore.selectedMovie.crew?.map((c) => {
                    return (
                      <div style={{ padding: "6px 4px" }}>
                        {c.person.name} <i>({c.role.job})</i>
                      </div>
                    );
                  })}
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
