import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { inject, observer } from "mobx-react";
import React from "react";
import MainStore, { IMovie } from "../../core/stores/MainStore";

interface IProps {
  MainStore?: MainStore;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof IMovie;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "Identifier",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Title",
  },
];

class Movies extends React.Component<IProps> {
  render() {
    const { MainStore } = this.props;
    return (
      <div>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "normal"}
                // sortDirection={orderBy === headCell.id ? order : false}
              >
                {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel> */}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

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

export default inject("MainStore")(observer(Movies));
