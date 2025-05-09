import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LineLoader } from "../../line-loader";
import NoPriceFound from "./NoPriceFound";
import PriceTile from "./PriceTile";
import { useAuth0 } from "@auth0/auth0-react";
import { SignupButton } from "../../buttons/signup-button";
import { examplePlansFromStripe } from "./examplePlansFromStripe";
import usePlans from "../../../hooks/usePlans";

function MoesifPlans(props) {
  const { isAuthenticated } = useAuth0();

  const [showExample, setShowExample] = useState();
  const { plans, plansLoading: loading, plansError: error } = usePlans();

  const getActionButton = (price, plan, options) => {
    if (options?.disable) {
      return (
        <button disabled className="button__price-action">
          Sign Up <span style={{ fontSize: "x-small", fontWeight: "300" }}>example</span>
        </button>
      );
    }
    if (isAuthenticated) {
      return (
        <Link to={`/checkout?price_id_to_purchase=${encodeURIComponent(price.id)}&plan_id_to_purchase=${encodeURIComponent(plan?.id)}`}>
          <button className="button__price-action">Select</button>
        </Link>
      );
    } else {
      return <SignupButton isPriceAction />;
    }
  };

  if (loading) {
    return <LineLoader />;
  }

  return (
    <div className="page-layout__content">
      <div className="plans-title-section">
        <h3 className="plans-title">API Products and Plans</h3>
        <div className="plans-hint">
          <div>
            Developers: See README.md file in <a href="https://github.com/Moesif/moesif-developer-portal">this repo</a> for setup instructions
          </div>
          <div>
            Or, jump to <Link to={"/setup"}>setup</Link> page to get started
          </div>
        </div>
      </div>
      {error && <p>Error loading plans</p>}
      {!loading && !error && (!plans || plans.length === 0) && <NoPriceFound />}
      <div className="plans--container">
        {plans &&
          plans
            .filter((plan) => plan.status === "active")
            .map((plan) =>
              plan?.prices?.map((price) => <PriceTile key={`${plan.id}${price.id}`} plan={plan} price={price} actionButton={getActionButton(price, plan)} />)
            )
            .flat()}
      </div>
      <div>
        <button
          className="button"
          onClick={() => {
            setShowExample(!showExample);
          }}
        >
          {showExample ? "Hide " : "Show "}example plans
        </button>
      </div>
      {showExample && (
        <div className="plans--container">
          {examplePlansFromStripe.hits
            .map((plan) =>
              plan?.prices?.map((price) => (
                <PriceTile key={`${plan.id}${price.id}`} plan={plan} price={price} actionButton={getActionButton(price, plan, { disable: true })} />
              ))
            )
            .flat()}
        </div>
      )}
    </div>
  );
}

export default MoesifPlans;
