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
                  <img
                    src={`${MainStore.selectedMovie.poster.small}`}
                    alt="movie poster"
                  />
                </Grid>

                <Grid xs={4}>
                  Details
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
                </Grid>

                <Grid xs={4}>
                  Cast
                  <ul>
                    {MainStore.selectedMovie.cast?.map((c) => {
                      return (
                        <li>
                          {c.person.name} - Character: {c.role.character}
                        </li>
                      );
                    })}
                  </ul>
                  Crew
                  <ul>
                    {MainStore.selectedMovie.crew?.map((c) => {
                      return (
                        <li>
                          {c.person.name} - Dep: {c.role.department} Job:{" "}
                          {c.role.job}
                        </li>
                      );
                    })}
                  </ul>
                </Grid>
              </Grid>
              <Grid container item spacing={2}>
                <Grid xs={6}>
                  <div>
                    Wiki:{" "}
                    <a
                      target="_blank"
                      href={`https://en.wikipedia.org/wiki/${MainStore.selectedMovie?.name}`}
                    >
                      {MainStore.selectedMovie?.name}
                    </a>
                  </div>
                  {MainStore.selectedMovie?.wikipediaOverview}
                </Grid>
                <Grid xs={6}>
                  <div>
                    IMBD:{" "}
                    <a
                      target="_blank"
                      href={`https://www.imdb.com/title/${MainStore.selectedMovie?.IMBDId}`}
                    >
                      {MainStore.selectedMovie?.name}
                    </a>
                  </div>

                  <div>{MainStore.selectedMovie?.overview}</div>
                </Grid>
              </Grid>
              <Grid container item spacing={2}></Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }
}

export default inject("MainStore")(observer(MovieDialog));
