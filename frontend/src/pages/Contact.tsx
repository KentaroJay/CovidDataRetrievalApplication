import {
  Typography,
  Box,
  TextField,
  Stack,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import type { JSX } from "react";
import { useCreateInquiry } from "../graphql/useInquiry";
import Error from "../components/Error";
import CompletedDialogTitle from "../components/CompletedDialogTitle";

// Custom styles for the dialog.
const CompletedDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Contact = (): JSX.Element => {
  // Settings for the dialog.
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleClose = () => {
    setIsDialogOpen(false);
  };

  // Settings for Redux.
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: "Contact" });
  }, [dispatch]);

  // Settings for the mutation.
  const { createInquiry, data, loading, error } = useCreateInquiry();

  // Settings for the form.
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const commentRef = useRef<HTMLInputElement>();
  const formRef = useRef<HTMLFormElement>();
  useEffect(() => {
    if (data != null && data.createInquiry?.errors.length === 0) {
      // Open the dialog and reset the form when the mutation is successful.
      setIsDialogOpen(true);
      formRef.current?.reset();
    }
  }, [data]);
  useEffect(() => {
    if (
      data?.createInquiry?.errors != null &&
      data?.createInquiry?.errors.length !== 0
    ) {
      // Show the error message when the mutation is failed.
      alert(data?.createInquiry?.errors.map((e) => e.messages).join("\n"));
    }
  }, [data?.createInquiry?.errors]);
  if (error != null) return <Error />;

  return (
    <>
      {/* Backdrop opens when loading */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Dialog opens when submitting form finished successfully */}
      <CompletedDialog
        onClose={handleClose}
        aria-labelledby="dialog-title"
        open={isDialogOpen}
        fullWidth={true}
        maxWidth="md"
      >
        <CompletedDialogTitle id="dialog-title" onClose={handleClose}>
          The inquiry submitted successfully!!
        </CompletedDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Your name: {data?.createInquiry?.inquiry?.name}
          </Typography>
          <Typography gutterBottom>
            Your email address: {data?.createInquiry?.inquiry?.email}
          </Typography>
          <Typography gutterBottom>
            Your Inquiry: {data?.createInquiry?.inquiry?.comment}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </CompletedDialog>

      {/* Form */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h1" gutterBottom>
          Contact
        </Typography>
        <Box
          component="form"
          ref={formRef}
          method="post"
          action="http://localhost:8000/graphql"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            createInquiry({
              variables: {
                name: nameRef.current?.value,
                email: emailRef.current?.value,
                comment: commentRef.current?.value,
              },
            }).then(
              () => {},
              () => {}
            );
          }}
        >
          <Stack direction="column" spacing={2}>
            <TextField
              required
              disabled={loading}
              id="name"
              label="Your name"
              variant="standard"
              inputRef={nameRef}
            />
            <TextField
              required
              disabled={loading}
              id="email"
              label="Your email address"
              type="email"
              variant="standard"
              inputRef={emailRef}
            />
            <TextField
              required
              disabled={loading}
              id="comment"
              label="How may I help you?"
              variant="standard"
              multiline
              inputRef={commentRef}
            />
          </Stack>
          <Box height={20}></Box>
          <LoadingButton loading={loading} variant="contained" type="submit">
            Submit
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
};

export default Contact;
