import { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./auth";
import Layout from "./Layout";
import Loader from "./Loader";
import ThemeProvider from "./theme";

const Pages = lazy(() => import("./pages"));

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Layout>
          <Suspense fallback={<Loader />}>
            <Main />
          </Suspense>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

function Main() {
  const { loading } = useAuth();

  return loading ? <Loader /> : <Pages />;
}
