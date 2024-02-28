

import React from 'react'
import DesktopSidebar from './DesktopSidebar';
import theme2 from "../../../../components/theme/theme2";
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import { getToken } from 'next-auth/jwt'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import MobileFooter from './MobileFooter';

async function Sidebar({ children }) {

  // const session = await getServerSession(authOptions);
  // console.log(session)
  // const { data: session, status, update } = useSession();
  // console.log(session);

  // const isAuth = await getToken({ req })
  // console.log(isAuth.email)
  return (

    <ThemeProvider theme={theme2}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <div
        // className=" h-screen"
        >
          <DesktopSidebar />
          {/* <MobileFooter /> */}
          {/* <DesktopSidebar currentUser={currentUser!} /> */}
          {/* <MobileFooter /> */}
          {/* <div className="h-screen"> */}
          {children}
          {/* </div> */}
        </div>

      </Container>
    </ThemeProvider >

  )
}

export default Sidebar;