// Import npm packages
import React, { useEffect, useState } from "react";

// Import Firebase packages
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../utils/firebase";

// Import MUI components
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Dialog,
  DialogActions,
  DialogContent,
  FormHelperText,
  Box,
  Toolbar,
  Typography,
  IconButton,
  AppBar,
  DialogContentText,
} from "@mui/material";
import {
  Close as CloseIcon,
  VolunteerActivism as Thanks,
} from "@mui/icons-material";

// Import custom components
// import CustomSnackBar from "../SnackBar/CustomSnackBar.react";

// Import validations
import {
  emailValidation,
  numberValidation,
  nameValidation,
} from "../../utils/validations";
import CustomSnackBar from "./CustomSnackbar";

// TypeScript interface for props
interface VolunteerModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  projectHeading?: string;
}

// TypeScript interfaces for form data and other state variables could be defined if needed
interface FormData {
  name: string;
  mob: string;
  email: string;
  position: string;
  project?: string;
}

export default function VolunteerModal({
  isOpen,
  onClose,
  projectHeading,
}: VolunteerModalProps) {
  const [open, setOpen] = useState(false);
  const initialFormState = {
    name: "",
    mob: "",
    email: "",
    position: "",
  };
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isNameValid, setNameValid] = useState(true);
  const [isToasterOpen, setIsToasterOpen] = useState(false);

  const handleClose = () => {
    onClose(false);
    setOpen(false);
    resetData();
  };

  const handleForm =
    (prop: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [prop]: event.target.value });
    };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    let email = e.target.value.trim();
    setEmailValid(!!email && emailValidation().test(email));
    if (emailValidation().test(email)) {
      setFormData({ ...formData, email: email });
    }
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.value.trim();
    setNameValid(!!name && nameValidation().test(name));
    if (nameValidation().test(name)) {
      setFormData({ ...formData, name: name });
    }
  };

  const volunteereData = async () => {
    const dataRef = collection(db, "volunteerDetails");
    await addDoc(dataRef, {
      created: serverTimestamp(),
      formData: formData,
    });
  };

  const handleSubmitForm = () => {
    formData.project = projectHeading ?? "";
    setIsToasterOpen(true);
    volunteereData();
    console.log(formData);
  };

  const resetData = () => {
    setFormData({ name: "", mob: "", email: "", position: "" });
    setEmailValid(true);
    setNameValid(true);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    isOpen && (
      <Dialog open={open}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setIsToasterOpen(false);
                handleClose();
                setFormData(initialFormState);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, padding: "0.5rem 0" }}
              variant="h6"
              component="div"
            >
              Become a Volunteer
              {projectHeading ? " for " + projectHeading : ""}
            </Typography>
          </Toolbar>
        </AppBar>

        {!isToasterOpen && (
          <>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                minWidth: {
                  lg: "25rem",
                  md: "25rem",
                  sm: "20rem",
                  xs: "20rem",
                },
              }}
            >
              <DialogContentText>
                Volunteers are the backbone of our Living Treasure NGO. Without
                their dedication and commitment, we would not be able to carry
                out our mission of preserving and promoting the cultural
                heritage of our communities. Our volunteers come from all walks
                of life and bring a diverse range of skills and experiences to
                the organization. Whether it&apos;s through organizing events,
                conducting research, or assisting with administrative tasks, our
                volunteers play a vital role in helping us achieve our goals.
                Offering your time to The Living Treasure is a great way to
                contribute and also learn more about gaps and needs. Take stock
                of your skills and experience and talk to us to find out what
                kind of help we might need. Volunteers can provide assistance in
                the areas of technology, communications, fundraising,
                facilitation, and administrative help, and we can offer
                consulting in a specific program area such as education or
                health. We are always looking for passionate individuals who
                want to make a difference and contribute to preserving our
                cultural heritage. If you are interested in becoming a
                volunteer, please contact us to learn more about our current
                opportunities.
              </DialogContentText>
              <FormControl sx={{ marginTop: "0.5rem" }}>
                <InputLabel htmlFor="name-input-box" required>
                  Name
                </InputLabel>
                <OutlinedInput
                  required
                  id="name-input-box"
                  label="Name"
                  onChange={handleName}
                />
                {!isNameValid && (
                  <FormHelperText error id="name-error">
                    Please enter valid name
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <InputLabel htmlFor="mobile-input-box" required>
                  Mobile
                </InputLabel>
                <OutlinedInput
                  required
                  id="mobile-input-box"
                  label="Mobile"
                  type="tel"
                  onChange={handleForm("mob")}
                  onKeyPress={(e) => {
                    if (numberValidation().test(e.key) === false) {
                      e.preventDefault();
                    }
                  }}
                />
              </FormControl>
              <FormControl
                sx={{
                  flex: 1,
                }}
              >
                <InputLabel htmlFor="email-input-box" required>
                  Email
                </InputLabel>
                <OutlinedInput
                  required
                  id="email-input-box"
                  label="Email"
                  type="email"
                  onChange={handleEmail}
                />
                {!isEmailValid && (
                  <FormHelperText error id="email-error">
                    Please enter valid email address
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                sx={{
                  flex: 1,
                }}
              >
                <InputLabel htmlFor="position-input-box" required>
                  How can you help us?
                </InputLabel>
                <OutlinedInput
                  required
                  id="position-input-box"
                  label="How can you help us?"
                  type="text"
                  onChange={handleForm("position")}
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={handleSubmitForm}
                disabled={
                  formData.name === "" ||
                  formData.mob === "" ||
                  formData.email === "" ||
                  formData.position === ""
                }
              >
                Submit
              </Button>
            </DialogActions>
          </>
        )}
        {isToasterOpen && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              minWidth: { lg: "25rem", md: "25rem", sm: "20rem", xs: "20rem" },
            }}
          >
            <CustomSnackBar
              animation="zoom"
              iconColor="var(--primary-color)"
              textColor="var(--primary-color)"
              icon={Thanks}
              message="Thank you for your interest, we will contact you soon"
              closeMessage="Okay"
              onClose={(value) => {
                setIsToasterOpen(value);
                handleClose();
                setFormData(initialFormState);
              }}
            />
          </Box>
        )}
      </Dialog>
    )
  );
}
