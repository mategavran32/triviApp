import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import * as Loader from "react-loader-spinner";
function LodaingIndicator() {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div className="loader">
        <Loader.Dna />
      </div>
    )
  );
}

export default LodaingIndicator;
