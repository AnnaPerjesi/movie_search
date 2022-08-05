import { inject, observer } from "mobx-react";
import React from "react";
import MainStore, { IMovie } from "../../core/stores/MainStore";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { toJS } from "mobx";

interface IProps {
  MainStore?: MainStore;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Movie title", width: 500 },
];

class Movies extends React.Component<IProps> {
  render() {
    const { MainStore } = this.props;
    return (
      <div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={toJS(MainStore.movies)}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    );
  }
}

export default inject("MainStore")(observer(Movies));
