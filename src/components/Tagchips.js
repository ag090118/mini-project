import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { IoMdInformationCircle } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray(props) {
  const {
    chipData,
    setChipData,
    handleDelete,
    chipDataPre,
    setChipDataPre,
    handleDeletePre,
  } = props;
  return (
    <div className="tagchips-inside-wrapper">
      <Paper
        id="scroll"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          p: 0.5,
          m: 0,
          width: "50%",
          minHeight: "fit-content",
          height: "100%",
          overflow: "auto",
        }}
        component="ul"
      >
        <Chip label="Add Tags" color="primary" />
        {chipData.map((data) => {
          return (
            <ListItem key={data.key}>
              <Chip
                size="small"
                label={data.label}
                deleteIcon={<IoAddCircle />}
                onDelete={handleDelete(data)}
              />
            </ListItem>
          );
        })}
      </Paper>

      <Paper
        id="scroll"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          p: 0.5,
          m: 0,
          width: "50%",
          minHeight: "fit-content",
          height: "100%",
          overflow: "auto",
        }}
        component="ul"
      >
        <Chip label="Post Tags" color="primary" />
        {chipDataPre.map((data) => {
          return (
            <ListItem key={data.key}>
              <Chip
                size="small"
                label={data.label}
                onDelete={data.key === 0 ? undefined : handleDeletePre(data)}
              />
            </ListItem>
          );
        })}
      </Paper>
    </div>
  );
}
