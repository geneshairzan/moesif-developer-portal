import React, { useState } from "react";
import Modal from "react-modal";
import SVG from "react-inlinesvg";
import copy from "copy-to-clipboard";

import { PageLayout } from "../../page-layout";
import { PageLoader } from "../../page-loader";
import copyIcon from "../../../images/icons/copy.svg";
import successIcon from "../../../images/icons/success.svg";
import apiKeyIcon from "../../../images/icons/api-key.svg";
import useAuthCombined from "../../../hooks/useAuthCombined";

const Keys = () => {
  const { user, isLoading, userEmail, idToken } = useAuthCombined();

  const [APIKey, setAPIKey] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  let resolvedEmail = user?.email || userEmail;

  Modal.setAppElement("#root");

  function openModal() {
    setIsOpen(true);
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <PageLayout>
      <p>this is documentation page</p>
    </PageLayout>
  );
};

export default Keys;
