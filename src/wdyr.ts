/// <reference types="@welldone-software/why-did-you-render" />
import React from "react";
import whyDidYouRender from "@welldone-software/why-did-you-render";

console.log("WDYR initialization...");
whyDidYouRender(React, {
  trackAllPureComponents: true,
  trackHooks: true,
  logOnDifferentValues: true,
});
