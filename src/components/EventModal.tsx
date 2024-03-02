// Import necessary libraries and types
import React, { useEffect, useState, FC, forwardRef } from "react";
import PropTypes from "prop-types";
import { SlideProps } from "@mui/material/Slide";
import {
  Button,
  Container,
  FormControl,
  Radio,
  RadioGroup,
  OutlinedInput,
  FormControlLabel,
  Dialog,
  InputLabel,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Divider,
  List,
  ListItem,
  ListItemText,
  FormGroup,
  FormLabel,
  FormHelperText,
  Checkbox,
  Slide,
  Box,
} from "@mui/material";
import {
  Close as CloseIcon,
  VolunteerActivism as ThanksIcon,
} from "@mui/icons-material";
import CustomSnackBar from "../components/CustomSnackbar";
import {
  emailValidation,
  numberValidation,
  nameValidation,
} from "../../utils/validations";
import YoutubeFrame from "./YoutubeFrame";
import AddressMap from "./AddressMap";
import Link from "next/link";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../utils/firebase";

// Define TypeScript interfaces for props
interface EventModalProps {
  heading?: string;
  description?: string;
  status?: "upcoming" | "live" | "finished" | "";
  onClick?: () => void;
  isOpen: boolean;
  onClose: (value: boolean) => void;
  mapUrl?: string;
  youtubeUrl?: string;
  type?: string; // Assuming 'type' prop exists based on usage
}

// Define the initial state type
interface FormState {
  name: string;
  contact: string;
  email: string;
  noOfAttendies: string;
  reference: string;
  event?: string;
}

const Transition = forwardRef(function Transition(
  props: SlideProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EventModal: FC<EventModalProps> = ({
  isOpen,
  onClose,
  heading,
  description,
  status,
  mapUrl,
  youtubeUrl,
  type,
}) => {
  const initialFormState: FormState = {
    name: "",
    contact: "",
    email: "",
    noOfAttendies: "",
    reference: "",
  };

  const [open, setOpen] = useState(isOpen);
  const [checked, setChecked] = useState(false);
  const [isToasterOpen, setIsToasterOpen] = useState(false);
  const [isNameValid, setNameValid] = useState(true);
  const [isEmailValid, setEmailValid] = useState(true);
  const [formData, setFormData] = useState<FormState>(initialFormState);

  // Adjusted for TypeScript
  const handleClose = (): void => {
    onClose(false);
    setOpen(false);
    setFormData(initialFormState);
    setChecked(false);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleForm =
    (prop: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [prop]: event.target.value });
    };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    let email = e.target.value.trim();
    setEmailValid(!!email && emailValidation().test(email));
    if (isEmailValid) setFormData({ ...formData, email });
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.value.trim();
    setNameValid(!!name && nameValidation().test(name));
    if (isNameValid) setFormData({ ...formData, name });
  };

  const handleSubmitForm = async () => {
    setIsToasterOpen(true);
    formData.event = heading ?? "";
    // Assuming you've set up Firestore correctly and "db" is initialized
    const dataRef = collection(db, "EventModalForm");
    await addDoc(dataRef, {
      created: serverTimestamp(),
      formData,
    });
  };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const inputProps = { min: 0 };

  const youtubeId = youtubeUrl?.substring(youtubeUrl?.lastIndexOf("/") + 1);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Event Details
            </Typography>
          </Toolbar>
        </AppBar>

        <List>
          <ListItem
            sx={{
              display: "flex",
              flexDirection: {
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column",
              },
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <ListItemText
              primary={heading + " (" + type?.toUpperCase() + " EVENT)"}
              secondary={description}
              sx={{
                flex: { lg: 3, md: 2, sm: "unset", xs: "unset" },
              }}
            />
            <ListItemText
              primary={
                `You can watch this event ` +
                (type === "online" ? "live on " : "on")
              }
              sx={{
                flex: 1,
              }}
              secondary={
                <a
                  className="youtubeLink"
                  href={`https://youtu.be/${youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Youtube
                </a>
              }
            />
          </ListItem>

          <Divider />

          <Container
            maxWidth={false}
            sx={{
              display: "flex",
              gap: 3,
              marginTop: 2,
              flexDirection: {
                xl: "row",
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column",
              },

              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            {type === "offline" && status !== "finished" ? (
              <AddressMap />
            ) : (
              <YoutubeFrame youtubeUrl={youtubeId ? youtubeId : ""} />
            )}
            {(status === "live" || status === "upcoming") && !isToasterOpen && (
              <FormGroup
                sx={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                  gap: { md: "1rem", sm: "1rem", xs: "1rem" },
                }}
              >
                <FormControl>
                  <InputLabel htmlFor="name" required>
                    Name
                  </InputLabel>
                  <OutlinedInput
                    id="name"
                    type="text"
                    label="Name"
                    onChange={handleName}
                  />
                  {!isNameValid && (
                    <FormHelperText error id="name-error">
                      Please enter valid name
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="email" required>
                    Email
                  </InputLabel>
                  <OutlinedInput
                    id="email"
                    label="Email"
                    type="email"
                    onChange={handleEmail}
                  />
                  {!isEmailValid && (
                    <FormHelperText error id="email-error">
                      Please enter valid email
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="contact-number" required>
                    Contact Number
                  </InputLabel>
                  <OutlinedInput
                    id="contact-number"
                    label="Contact Number"
                    type="tel"
                    onChange={handleForm("contact")}
                    onKeyPress={(e) => {
                      if (numberValidation().test(e.key) === false) {
                        e.preventDefault();
                      }
                    }}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="number-of-attendies" required>
                    Number of Attendies
                  </InputLabel>
                  <OutlinedInput
                    id="number-of-attendies"
                    label="Number of Attendies"
                    type="number"
                    inputProps={inputProps}
                    onChange={handleForm("noOfAttendies")}
                    onKeyPress={(e) => {
                      if (numberValidation().test(e.key) === false) {
                        e.preventDefault();
                      }
                    }}
                  />
                </FormControl>
                <FormControl
                  sx={{
                    display: "flex",
                  }}
                >
                  <FormLabel
                    id="radio-buttons-group-event-register-label"
                    required
                  >
                    How did you get to know about the event?
                  </FormLabel>
                  <RadioGroup
                    //   required
                    row
                    aria-labelledby="radio-buttons-group-event-register-label"
                    defaultValue={""}
                    name="radio-buttons-group-event-register"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                    onChange={handleForm("reference")}
                  >
                    <FormControlLabel
                      value="Whatsapp"
                      control={<Radio />}
                      label="Whatsapp"
                    />
                    <FormControlLabel
                      value="Facebook"
                      control={<Radio />}
                      label="Facebook"
                    />
                    <FormControlLabel
                      value="Youtube"
                      control={<Radio />}
                      label="Youtube"
                    />
                    <FormControlLabel
                      value="Website"
                      control={<Radio />}
                      label="Website"
                    />
                    <FormControlLabel
                      value="Family"
                      control={<Radio />}
                      label="Friends/ Family"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControlLabel
                  control={
                    <Checkbox
                      id="t_and_c"
                      checked={checked}
                      onChange={handleCheckbox}
                    />
                  }
                  label={
                    <label htmlFor={"t_and_c"}>
                      I agree to the{" "}
                      <Link
                        href="/terms-and-conditions"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms & Conditions
                      </Link>
                    </label>
                  }
                />

                <Button
                  variant="contained"
                  onClick={handleSubmitForm}
                  disabled={
                    formData.name === "" ||
                    formData.contact === "" ||
                    formData.email === "" ||
                    formData.noOfAttendies === "" ||
                    formData.reference === "" ||
                    !checked ||
                    !isEmailValid
                      ? true
                      : false
                  }
                >
                  Register
                </Button>
              </FormGroup>
            )}
            {isToasterOpen && (
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CustomSnackBar
                  animation="zoom"
                  iconColor="var(--primary-color)"
                  textColor="var(--primary-color)"
                  backgroundColor="var(--primary-color-light)"
                  icon={ThanksIcon}
                  message="Thanks !! it means a lot to us"
                  closeMessage="Okay"
                  onClose={(value) => {
                    setOpen(value);
                    setChecked(false);
                    onClose(value);
                    setIsToasterOpen(value);
                    setFormData(initialFormState);
                  }}
                />
              </Box>
            )}
          </Container>
        </List>
      </Dialog>
    </div>
  );
};

export default EventModal;
