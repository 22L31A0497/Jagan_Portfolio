"use client";

/*
  Thin client wrapper around Loader so the layout (server component) can
  render it without becoming a client boundary itself.
*/

import { useState } from "react";
import { Loader } from "./Loader";

export function LoaderGate() {
  const [, setDone] = useState(false);
  return <Loader onDone={() => setDone(true)} />;
}
