import "@fontsource/albert-sans/index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";
import { theme } from "./theme";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </ChakraProvider>
);
