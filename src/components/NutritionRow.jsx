import { Typography, Box } from '@mui/material'

function NutritionRow({ label, value, unit = '' }) {
  if (value === undefined || value === null) {
    return null
  }

  return (
    <Box>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        {value} {unit}
      </Typography>
    </Box>
  )
}

export default NutritionRow
