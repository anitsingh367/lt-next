import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  Radio,
  RadioGroup,
  OutlinedInput,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Select,
  FormHelperText,
  InputAdornment,
  Autocomplete,
  TextField,
  Toolbar,
  Typography,
  IconButton,
  AppBar,
  DialogContentText,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { states as stateList } from "../../utils/States";
import { cities as cityList } from "../../utils/Cities";
import {
  emailValidation,
  numberValidation,
  nameValidation,
} from "../../utils/validations";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../utils/firebase";

interface ContributeModalProps {
  isNavbar: boolean;
  projectHeading?: string;
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

interface FormData {
  amount: string;
  panNumber: string;
  name: string;
  address: string;
  state: string;
  city: string;
  zip: string;
  mob: string;
  email: string;
  project?: string;
}

const initialFormState: FormData = {
  amount: "",
  panNumber: "",
  name: "",
  address: "",
  state: "",
  city: "",
  zip: "",
  mob: "",
  email: "",
};

const ContributeModal: React.FC<ContributeModalProps> = ({
  isNavbar,
  projectHeading,
  isOpen,
  onClose,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [isEmailValid, setEmailValid] = useState<boolean>(true);
  const [isNameValid, setNameValid] = useState<boolean>(true);
  const [amount, setAmount] = useState<string>("");

  //Update City list after selecting the state
  const newCityList = cityList.filter((items) => {
    return items.state.includes(formData?.state);
  });

  // Handle Modal close
  const handleClose = (): void => {
    onClose(false);
    setOpen(false);
    resetData();
  };

  //Reset Data function to reset form inputs
  const resetData = () => {
    setAmount("");
    setFormData(initialFormState);
    setEmailValid(true);
    setNameValid(true);
  };

  //Handle Amount Selection
  const handleAmount = (event: any) => {
    setAmount(event.target.value);
    setFormData({ ...formData, amount: event.target.value.trim() });
  };

  const handleForm = (prop: any) => (event: any) => {
    console.log(event.target.value);
    setFormData({ ...formData, [prop]: event.target.value.trim() });
  };

  const handleName = (e: any) => {
    let name = e.target.value.trim();
    if (!name || nameValidation().test(name) === false) {
      setNameValid(false);
    } else {
      setNameValid(true);
      setFormData({ ...formData, name: name });
    }
  };

  const handleEmail = (e: any) => {
    let email = e.target.value.trim();

    if (!email || emailValidation().test(email) === false) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
      setFormData({ ...formData, email: email });
    }
  };

  // form submission
  const contributeData = async () => {
    const dataRef = collection(db, "contributeDetails");
    await addDoc(dataRef, {
      created: serverTimestamp(),
      formData: formData,
    });
  };

  //Handle Form Submit
  const handleSubmitForm = () => {
    formData.project = projectHeading;
    formData.project = projectHeading ? projectHeading : "";
    handleClose();

    contributeData();
    console.log(formData);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  // JSX remains the same
  return (
    <Dialog open={open}>
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
          <Typography
            sx={{ ml: 2, flex: 1, padding: "0.5rem 0" }}
            variant="h6"
            component="div"
          >
            {isNavbar
              ? "Contribute For The Cause"
              : `Contribute To ${projectHeading ? projectHeading : "Project"}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
      >
        <DialogContentText>
          We Need your support FOR tv broadcast, webcast, books, magazines, Self
          Elevating Workshops / seminars, workshops & Seminars in schools &
          colleges ,Medical camp & dispensary, education support & to run many
          other projects for humanity & noble cause Your Monthly Contribution
          help us to serve the needy and less privileged brethren of our
          society. It enables us to provide them with the basic services without
          any discrimination of religion, caste and creed.
        </DialogContentText>
        <FormControl
          sx={{
            display: "flex",
          }}
        >
          <RadioGroup
            // required
            row
            aria-labelledby="radio-buttons-group-label"
            defaultValue={""}
            name="radio-buttons-group"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
            }}
            onChange={handleAmount}
          >
            <FormControlLabel value="100" control={<Radio />} label="₹100" />
            <FormControlLabel value="500" control={<Radio />} label="₹500" />
            <FormControlLabel value="1000" control={<Radio />} label="₹1000" />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="Other Amount"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="amount-input-box" required>
            Amount
          </InputLabel>
          <OutlinedInput
            required
            id="amount-input-box"
            value={formData.amount === "other" ? "" : formData.amount}
            onChange={handleForm("amount")}
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
            label="Amount"
            type="number"
            inputProps={{ min: "0" }}
            onKeyPress={(e) => {
              if (numberValidation().test(e.key) === false) {
                e.preventDefault();
              }
            }}
            disabled={amount === "other" ? false : true}
            placeholder={amount === "" ? "Please select above options" : ""}
          />
          {parseInt(formData.amount) === 0 && (
            <FormHelperText error id="accountId-error">
              Please enter some amount
            </FormHelperText>
          )}
        </FormControl>
        {parseInt(formData?.amount) > 5000 && (
          <FormControl>
            <InputLabel htmlFor="pan-card-details">
              Enter Pan Card No (Required if donation is above ₹ 5000)
            </InputLabel>
            <OutlinedInput
              id="pan-card-details"
              value={formData.panNumber?.toUpperCase()}
              onChange={handleForm("panNumber")}
              label="Enter Pan Card No (Required if donation is above ₹ 5000)"
              type="text"
              hidden={true}
              disabled={amount === "other" ? false : true}
              placeholder={amount === "" ? "Please select above options" : ""}
            />
          </FormControl>
        )}
        <FormControl>
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
        <FormControl>
          <InputLabel htmlFor="address-input-box" required>
            Address
          </InputLabel>
          <OutlinedInput
            required
            id="address-input-box"
            label="Address"
            onChange={handleForm("address")}
          />
        </FormControl>
        <FormControl>
          <InputLabel id="state-select-label" required>
            State
          </InputLabel>
          <Select
            required
            labelId="state-select-label"
            id="state-select"
            value={formData.state}
            label="State"
            onChange={handleForm("state")}
          >
            {stateList?.map((list, index) => {
              return (
                <MenuItem key={index} value={list.name}>
                  {list.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: { lg: "row", md: "row", xs: "column" },
            gap: 1.5,
          }}
        >
          <FormControl sx={{ flex: 1 }}>
            <Autocomplete
              freeSolo
              onChange={(event, newValue: string | null) => {
                setFormData({ ...formData, city: newValue ?? "" });
              }}
              onInputChange={(event, newInputValue) => {
                setFormData({ ...formData, city: newInputValue });
              }}
              disabled={formData.state === "" ? true : false}
              id="contribute-modal-city"
              options={newCityList.map((option) => option.label)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    formData.state === ""
                      ? "Please select the State first"
                      : "City"
                  }
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </FormControl>
          <FormControl
            sx={{
              flex: 1,
            }}
          >
            <InputLabel htmlFor="zip-input-box" required>
              Zip
            </InputLabel>
            <OutlinedInput
              required
              id="zip-input-box"
              label="Zip"
              type="text"
              onChange={handleForm("zip")}
            />
          </FormControl>
        </FormGroup>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: { lg: "row", md: "row", xs: "column" },
            gap: 1.5,
          }}
        >
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
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmitForm}
          disabled={
            formData.amount === "" ||
            formData.amount === "other" ||
            formData.name === "" ||
            formData.address === "" ||
            formData.city === "" ||
            formData.state === "" ||
            formData.zip === "" ||
            formData.mob === "" ||
            formData.email === "" ||
            parseInt(formData.amount) === 0 ||
            (parseInt(formData.amount) > 5000 && formData.panNumber === "") ||
            !isEmailValid
              ? true
              : false
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContributeModal;
