import { useState, useEffect } from "react";
import { Box, MenuItem, Select, Button } from "@mui/material";

export default function SearchBar({ list, filterList }) {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);

  // Mock state-city mapping (update as per your backend)
  const stateCityMap = {
    Alabama: ["DOTHAN", "MONTGOMERY", "BIRMINGHAM"],
    California: ["LOS ANGELES", "SAN FRANCISCO", "SAN DIEGO"],
  };

  useEffect(() => {
    if (state) {
      setCities(stateCityMap[state] || []);
      setCity(""); // reset city when state changes
    }
  }, [state]);

  const handleSearch = () => {
    // Filter bookings based on selected state & city
    const filtered = list.filter(
      (item) =>
        item.State.toLowerCase() === state.toLowerCase() &&
        item.City.toLowerCase() === city.toLowerCase()
    );
    filterList(filtered);
  };

  return (
    <Box display="flex" gap={2} flexDirection={{ xs: "column", md: "row" }}>
      <Select
        id="state"
        value={state}
        displayEmpty
        onChange={(e) => setState(e.target.value)}
      >
        <MenuItem value="" disabled>
          Select State
        </MenuItem>
        {Object.keys(stateCityMap).map((st) => (
          <MenuItem key={st} value={st}>
            {st}
          </MenuItem>
        ))}
      </Select>

      <Select
        id="city"
        value={city}
        displayEmpty
        onChange={(e) => setCity(e.target.value)}
        disabled={!state}
      >
        <MenuItem value="" disabled>
          Select City
        </MenuItem>
        {cities.map((c) => (
          <MenuItem key={c} value={c}>
            {c}
          </MenuItem>
        ))}
      </Select>

      <Button
        id="searchBtn"
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{ py: "15px", px: 8, flexShrink: 0 }}
        disabled={!state || !city}
      >
        Search
      </Button>
    </Box>
  );
}