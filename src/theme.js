// theme.js

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#5ECCC8",
    secondary: "#162E45",
    tertiary: "#006561",
    neutral: "#52807E",
  },
  fonts: {
    heading: "pretendard, sans-serif",
    body: "pretendard, sans-serit",
    mono: "pretendard, monospace",
  },
  // ...기타 테마 속성들
});

export default theme;
