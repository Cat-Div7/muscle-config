import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ThemeToggle from "./components/ThemeToggle.js";
import { useTheme } from "./context/ThemeContextProvider.js";

export default function App() {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        MUI is ready 🎉
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Current theme: <strong>{theme}</strong>
      </Typography>

      <ThemeToggle />

      <Button variant="contained" size="large">
        Everything is working
      </Button>

      <Typography variant="caption" color="text.disabled">
        You can delete this demo and start building your app.
      </Typography>
    </Box>
  );
}
