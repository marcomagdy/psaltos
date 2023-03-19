import Home  from "./components/Home";
import  FetchData  from "./components/FetchData";
import AddData  from "./AddData"

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
