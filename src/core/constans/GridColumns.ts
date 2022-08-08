import { GridColDef } from "@mui/x-data-grid";
import { IGenre } from "../models/IMovie";

export const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Movie title",
    width: 400,
    cellClassName: "movieTitle",
  },
  { field: "score", headerName: "Score", width: 100 },
  {
    field: "genres",
    headerName: "Genres",
    width: 300,
    valueGetter(params) {
      return params.value
        .map((genre: IGenre) => {
          return genre.name;
        })
        .join(", ");
    },
  },
  {
    field: "releaseDate",
    headerName: "Released at",
    width: 300,
    valueGetter(params) {
      return new Date(params.value).toLocaleDateString("en-GB");
    },
  },
];
