import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DeleteBook from "./pages/DeleteBook";
import UpdateBook from "./pages/UpdateBook";
import ShowBook from "./pages/ShowBook";
import CreateBook from "./pages/CreateBook";

import PrivateRoute from "./PrivateRoute";
import MeBook from "./pages/MeBook";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/show/:id" element={<ShowBook />} />
        <Route
          path="/books/create"
          element={<PrivateRoute component={CreateBook} />}
        />
        <Route
          path="/books/mebook"
          element={<PrivateRoute component={MeBook} />}
        />
        <Route
          path="/books/update/:id"
          element={<PrivateRoute component={UpdateBook} />}
        />
        <Route
          path="/books/delete/:id"
          element={<PrivateRoute component={DeleteBook} />}
        />
        {/*  <Route path="/" element={<PrivateRoute />}>
          <Route path="/books/create" element={<CreateBook />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/books/mebook" element={<MeBook />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/books/update/:id" element={<UpdateBook />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/books/delete/:id" element={<DeleteBook />} />
        </Route> */}
      </Routes>
    </>
  );
};

export default App;
