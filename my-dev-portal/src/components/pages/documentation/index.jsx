import React, { useEffect, useState } from "react";

import Modal from "react-modal";
import SVG from "react-inlinesvg";
import copy from "copy-to-clipboard";

import { PageLayout } from "../../page-layout";
import { PageLoader } from "../../page-loader";
import useAuthCombined from "../../../hooks/useAuthCombined";
import { RedocStandalone } from "redoc";
// import data from "./fakestoreapi.yaml";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const Keys = () => {
  async function test(params) {
    const response = await fetch("https://8mfv0c41x9.execute-api.ap-southeast-3.amazonaws.com/v1/service1/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.text();
    console.log(data);
  }
  useEffect(() => {
    test();
  }, []);
  return (
    <PageLayout compact>
      <div
        style={{
          width: "100vw",
          maxWidth: "unset",
        }}
      >
        {/* <SwaggerUI url={"/data/fakestoreapi.yaml"} /> */}
      </div>
    </PageLayout>
  );
};

export default Keys;
