import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box } from '@mui/material';
import { addContact, updateContact } from '../../redux/contactslice';

const CreateContactPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existingContact = useSelector((state) =>
    state.contacts.contacts.find((c) => c.id === id)
  );

  const [firstName, setFirstName] = useState(existingContact?.firstName || '');
  const [lastName, setLastName] = useState(existingContact?.lastName || '');
  const [status, setStatus] = useState(existingContact?.status || 'Active');

  const handleSubmit = () => {
    if (!firstName || !lastName || !status) {
      return toast.error('Input fields cannot be empty!');
    }
    if (id) {
      dispatch(updateContact({ id, firstName, lastName, status }));
      toast.warn('Contact updated');
    } else {
      dispatch(addContact({ id: uuidv4(), firstName, lastName, status }));
      toast.success('Contact created');
    }
    navigate('/contacts');
  };

  return (
    <Box display="flex" justifyContent="center" minHeight="100vh" bgcolor="gray.100">
      <Box bgcolor="white" p={4} borderRadius={2} boxShadow={3} maxWidth="600px" width="100%">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/contacts')}
          color="primary"
          variant="text"
          sx={{ mb: 2 }}
        >
          Back to Contacts
        </Button>

        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {id ? 'Edit Contact' : 'Create Contact'}
        </h1>

        {/* First Name Input */}
        <TextField
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* Last Name Input */}
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* Status Radio Buttons */}
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend">Status</FormLabel>
          <RadioGroup
            row
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <FormControlLabel
              value="Active"
              control={<Radio />}
              label="Active"
            />
            <FormControlLabel
              value="Inactive"
              control={<Radio />}
              label="Inactive"
            />
          </RadioGroup>
        </FormControl>

        {/* Submit Button */}
        <Box textAlign="center">
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            size="large"
            sx={{ width: '100%', py: 2 }}
          >
            {id ? 'Edit Contact' : 'Create Contact'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateContactPage;
