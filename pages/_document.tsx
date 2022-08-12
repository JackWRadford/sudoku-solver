import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />{" "}
      <body>
        <Main />
        <div id="overlays"></div> {/* To portal elements */}
        <NextScript />
      </body>
    </Html>
  );
}
