import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { IoMdInformationCircle } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray(props) {
  const { collaborators, setCollaborators, handleAddCol, handleDeleteCol } =
    props;
  const [collaborator, setCollaborator] = useState("");
  function handleCollaborators(e) {
    setCollaborator(e.target.value);
  }
  function keyPress(e) {
    if (e.keyCode == 13) {
      var tmp = { key: uuidv4(), label: collaborator };
      handleAddCol(tmp);
      setCollaborator("");
    }
  }
  return (
    <div>
      <Paper
        sx={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          p: 0.5,
          m: 0,
          width: "100%",
          marginTop: "2%",
        }}
        component="ul"
      >
        <Chip label="Collaborators" color="primary" />
        <TextField
          sx={{
            marginLeft: "2%",
          }}
          inputProps={{ style: { fontSize: 10 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 10 } }} // font size of input label
          id="outlined-basic"
          label="Add Collaborators Emaill..."
          size="small"
          variant="outlined"
          value={collaborator}
          onChange={handleCollaborators}
          onKeyDown={keyPress}
        />
        {collaborators.map((data) => {
          return (
            <ListItem key={data.key}>
              <Chip
                size="small"
                label={data.label}
                onDelete={handleDeleteCol(data)}
              />
            </ListItem>
          );
        })}
      </Paper>
    </div>
  );
}
