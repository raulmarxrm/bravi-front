import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormPropsTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        alignItems: 'center',
        display: 'flex',
                        flexDirection: 'column',
      }}
      noValidate
      autoComplete="off"
    >
        <TextField
          required
          id="outlined-required"
          label="nome"
          autoComplete="current-nome"
        />
        <TextField
          id="outlined-celular-input"
          label="celular"
          autoComplete="current-celular"
        />        
        <TextField
          id="outlined-celular-input"
          label="whatsapp"
          autoComplete="current-whatsapp"
        />        
        <TextField
          id="outlined-celular-input"
          label="email"
          type="email"
          autoComplete="current-email"
        />        
        
    </Box>
  );
}
