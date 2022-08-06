import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, IconButton, DialogContent } from "@mui/material";
import { inject, observer } from "mobx-react";
import React from "react";
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
          <div>
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
          </div>

          <div>{MainStore.selectedMovie?.overview}</div>
        </DialogContent>
      </Dialog>
    );
  }
}

export default inject("MainStore")(observer(MovieDialog));
