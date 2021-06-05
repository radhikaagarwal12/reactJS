import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const BACKEND_URL = "http://localhost:5000";

const Notify = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    if (username === "" || email === "") {
      alert("add fileds to subscribe");
    } else {
      axios
        .post(BACKEND_URL + "/api/description/notify", {
          username: username,
          email: email,
        })
        .then((response) => {
          alert(response.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        Notify Me
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send Updates.
          </DialogContentText>
          <TextField
            id="name"
            label="Your Name"
            margin="dense"
            fullWidth
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            required
            variant="outlined"
          />

          <TextField
            type="email"
            id="email"
            fullWidth
            margin="dense"
            value={email}
            label="EmailId"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            variant="outlined"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Notify;
