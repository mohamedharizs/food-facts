import { Alert, Box } from '@mui/material'

function ErrorMessage({ message }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Alert severity="error" role="alert">
        {message}
      </Alert>
    </Box>
  )
}

export default ErrorMessage
