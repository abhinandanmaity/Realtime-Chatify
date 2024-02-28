// import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "./components/sidebars/Sidebar";
// import theme2 from "../../components/theme/theme2";
// import Container from '@mui/material/Container';
// import { ThemeProvider } from '@mui/material/styles';
// import { CssBaseline } from "@mui/material";

export default function UserLayout({ children }) {
    return (
        <>
            {/* <ThemeProvider theme={theme2}>
                <Container component="main" maxWidth="xl">
                    <CssBaseline/> */}
                    <Sidebar>
                        <div className="h-full">
                            {/* <UserList items={users} /> */}
                            {children}
                        </div>
                    </Sidebar>
                {/* </Container>
            </ThemeProvider > */}
        </>
    );
}
