import { lazy } from "react";
import { Route, Routes } from "react-router";

const Form = lazy(() => import("./form"));
const Admin = lazy(() => import("./admin"));

export default function Pages() {
  return (
    <Routes>
      <Route index element={<Form />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
