import { Chip } from "@mui/material";
import React from "react";
interface IProps {
  label: string;
  variant: "filled" | "outlined";
  colorIndex: number;
}

export default class CustomChip extends React.Component<IProps> {
  render() {
    const { label, variant, colorIndex } = this.props;

    const colors: any = [
      "default",
      "error",
      "warning",
      "primary",
      "secondary",
      "info",
      "success",
    ];

    const color:
      | "default"
      | "error"
      | "warning"
      | "primary"
      | "secondary"
      | "info"
      | "success" = colors[colorIndex];

    return (
      <div style={{ margin: "12px 6px" }}>
        <Chip label={label} variant={variant} color={color} />{" "}
      </div>
    );
  }
}
