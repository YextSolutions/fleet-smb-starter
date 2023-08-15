import * as React from "react";
import { JsonLd } from "react-schemaorg";
import { LocalBusiness } from "schema-dts";

export interface SchemaProps {
    data?: any;
  }

const Schema = ({ data }: SchemaProps) => {
  const name = data?.name || "Name";
  const address = data?.address || {
		"city": "New York",
		"countryCode": "US",
		"line1": "Default Ave",
		"localizedCountryName": "United States",
		"localizedRegionName": "New York",
		"postalCode": "10011",
		"region": "NY"
    };
  const email = (data?.emails && data?.emails[0]) || "default@yext.com";
  const telephone = data?.mainPhone || "+12345678910";
  const image = (data?.photoGallery && data.photoGallery[0]?.image.url) || "https://cdn.fs.brandfolder.com/cache=expiry:604800/deY3VGFpSjC761Abjbfc";
  const paymentAccepted = data?.paymentOptions || ["test", "test"];

  return (
    <>
      <JsonLd<LocalBusiness>
        item={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name,
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          email: email,
          telephone: telephone,
          image: image,
          paymentAccepted: paymentAccepted
        }}
      />
    </>
  );
};

export default Schema;