import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, Button, Badge, Typography, Box } from '@mui/material'

function NavBar() {
  const savedCount = useSelector((state) => state.saved.items.length)

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2e7d32' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          FoodFacts
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={NavLink}
            to="/"
            sx={{
              color: 'white',
              textDecoration: 'none',
              '&.active': {
                borderBottom: '3px solid white',
              },
            }}
          >
            Home
          </Button>

          <Button
            component={NavLink}
            to="/saved"
            sx={{
              color: 'white',
              textDecoration: 'none',
              '&.active': {
                borderBottom: '3px solid white',
              },
            }}
          >
            <Badge badgeContent={savedCount} color="error">
              Saved
            </Badge>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
