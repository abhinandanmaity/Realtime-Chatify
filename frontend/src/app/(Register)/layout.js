
import theme from "@/components/theme/theme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';


export default function RegisterLayout({ children }) {
  return (
    <section>
      <div className='min-h-full items-center justify-center py-2 px-4 sm:px-6 lg:px-8'>

        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xl">
            <CssBaseline />
            {children}
          </Container>
        </ThemeProvider>

      </div>
    </section>
  );
}