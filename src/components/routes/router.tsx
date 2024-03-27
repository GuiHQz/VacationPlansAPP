import { BrowserRouter, Routes, Route } from "react-router-dom";

import HolidayPlans from "../../pages/HolidayPlans/HolidayPlans";
import AddHolidayPlans from "../../pages/AddHolidayPlans/AddHolidayPlans";
import UpdateHolidayPlans from "../../pages/UpdateHolidayPlans/UpdateHolidayPlans";

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HolidayPlans />} />
        <Route path="/add" element={<AddHolidayPlans />} />
        <Route path="/edit/:id" element={<UpdateHolidayPlans />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
