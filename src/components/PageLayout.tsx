import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { AnalyticsProvider, AnalyticsScopeProvider } from "@yext/sites-components";
import { TemplateProps } from "@yext/pages";

export interface PageLayoutProps {
  children?: React.ReactNode;
  data?: any;
  templateData: TemplateProps;
}

const PageLayout = ({ children, data, templateData }: PageLayoutProps) => {

  let backgroundColor;

  if (data.c_backgroundColor) {
    const transformedColor = data.c_backgroundColor.replace(/\s+/g, '').toLowerCase();
    backgroundColor = `--backgroundColor: ${transformedColor}`;
  } else {
    backgroundColor = `--backgroundColor: white`;
  }


  return (
    <>
      <style>:root {`{${backgroundColor}}`}</style>
      <AnalyticsProvider templateData={templateData}>
        <div className="min-h-screen" >
          <AnalyticsScopeProvider name="header">
            <Header data={data}/>
          </AnalyticsScopeProvider>
          {children}
          <AnalyticsScopeProvider name="footer">
            <Footer />
          </AnalyticsScopeProvider>
        </div>
      </AnalyticsProvider>
    </>
  );
};

export default PageLayout;
