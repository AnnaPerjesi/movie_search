import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

interface IProps {}

export default class Footer extends React.Component<IProps> {
  render() {
    return (
      <div className="footer">
        <div>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB
        </div>
        <div>
          <GitHubIcon />
        </div>
      </div>
    );
  }
}
