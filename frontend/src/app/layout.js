// import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "./Provider/Authcontex";
import Reduxcontex from "./Provider/Reduxcontex";
import Tostercontex from "./Provider/Tostercontex";
import ChatProvider from "./Provider/ChatProvider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Realtime - Chatify",
  description: "you can communicate with your friend",
  icons: {
    icon: '/images.jpeg', // /public path
  },
};

export default function RootLayout({ children }) {

  return (

    <html lang="en">
      <body
      // className={inter.className}
      >
        <AuthContext>
          <ChatProvider>
            <Reduxcontex>
              {/* <Provider store={store}> */}
              <Tostercontex />
              {children}
            </Reduxcontex>
          </ChatProvider>
          {/* </Provider> */}
        </AuthContext>
      </body>
    </html>
  );
}
