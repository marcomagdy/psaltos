import FetchData from "./components/FetchData";
import AddData from "./AddData";
import Home from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/add-data',
    element: <AddData/>
  }
];

export default AppRoutes;
