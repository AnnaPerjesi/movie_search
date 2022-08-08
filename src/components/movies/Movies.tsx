import { inject, observer } from "mobx-react";
import React from "react";
import MainStore from "../../core/stores/MainStore";
import { DataGrid } from "@mui/x-data-grid";
import { toJS } from "mobx";
import { columns } from "../../core/constans/GridColumns";

interface IProps {
  MainStore?: MainStore;
}

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
