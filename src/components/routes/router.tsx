import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HolidayPlans } from "../../pages/HolidayPlans/HolidayPlans";
import { AddHolidayPlans } from "../../pages/AddHolidayPlans/AddHolidayPlans";

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HolidayPlans />} />
        <Route path="/add" element={<AddHolidayPlans />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
