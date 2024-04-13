import DemoComponent from "./DemoComponent";
import { generateDate, months } from "./util/calendar";
import cn from "./util/cn";
import dayjs from "dayjs";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Front, AppBar } from "./components/ManagePage"
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {
  return (

    <RecoilRoot>
      <Router>
        <AppBar></AppBar>

        <Routes>
          <Route path="/" element={<Front />} />
          
        </Routes>
      </Router>
    </RecoilRoot>
  )
}




export default App;
