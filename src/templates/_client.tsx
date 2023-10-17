import * as ReactDOM from "react-dom";
import * as React from "react";
import { PageContext } from "@yext/pages";

export { render };

const render = async (pageContext: PageContext<any>) => {
  const { Page, pageProps } = pageContext;

  let backgroundColor;

  if (pageProps.document.c_backgroundColor) {
    const transformedColor = pageProps.document.c_backgroundColor.replace(/\s+/g, '').toLowerCase();
    backgroundColor = `--backgroundColor: ${transformedColor}`;
  } else {
    backgroundColor = `--backgroundColor: white`;
  }

  ReactDOM.hydrate(
    <Page {...pageProps}>
        <style>:root {`{${backgroundColor}}`}</style>    
    </Page>,
    document.getElementById("reactele")
  );
};