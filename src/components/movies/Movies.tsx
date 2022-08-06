import { inject, observer } from "mobx-react";
import React from "react";
import MainStore, { IMovie } from "../../core/stores/MainStore";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toJS } from "mobx";

interface IProps {
  MainStore?: MainStore;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Movie title",
    width: 500,
    cellClassName: "movieTitle",
  },
  { field: "score", headerName: "Score", width: 70 },

  {
    field: "releaseDate",
    headerName: "Released at",
    width: 500,
    valueGetter(params) {
      return new Date(params.value).toLocaleDateString("en-GB");
    },
  },
];

class Movies extends React.Component<IProps> {
  render() {
    const { MainStore } = this.props;

    if (MainStore.movies?.length === 0) {
      return <div>There is no movie to show</div>;
    }

    return (
      <div>
        <div style={{ height: "60vh", width: "100%" }}>
          <DataGrid
            rows={toJS(MainStore.movies)}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            onCellClick={(params) => {
              if (params.field === "name") {
                console.log(toJS(params));
                MainStore.setSelectedMovieId(params.id as any);
              }
            }}
          />
        </div>
      </div>
    );
  }
}

export default inject("MainStore")(observer(Movies));
