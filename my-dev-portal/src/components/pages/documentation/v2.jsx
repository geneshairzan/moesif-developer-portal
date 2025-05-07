import React, { useState } from "react";
import Modal from "react-modal";
import SVG from "react-inlinesvg";
import copy from "copy-to-clipboard";

import { PageLayout } from "../../page-layout";
import { PageLoader } from "../../page-loader";
import useAuthCombined from "../../../hooks/useAuthCombined";
import { RedocStandalone } from "redoc";
import data from "./fakestoreapi.json";

const Keys = () => {
  const { user, isLoading, userEmail, idToken } = useAuthCombined();

  const [modalIsOpen, setIsOpen] = useState(false);

  Modal.setAppElement("#root");

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <PageLayout compact>
      <div
        style={{
          width: "100vw",
          maxWidth: "unset",
        }}
      >
        <RedocStandalone specUrl={data} />
      </div>
    </PageLayout>
  );
};

export default Keys;
