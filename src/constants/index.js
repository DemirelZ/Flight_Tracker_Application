export const options = {
  method: "GET",
  url: "https://flight-radar1.p.rapidapi.com/flights/list-in-boundary",
  params: {
    bl_lat: "34.02369",
    bl_lng: "27.406082",
    tr_lat: "42.970403",
    tr_lng: "44.761821",
    limit: "300",
  },
  headers: {
    "X-RapidAPI-Key": "5e1b5b32c4mshad5b1b1f3e1c3c4p1b95fcjsn83a801dd00aa",
    "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
  },
};

export const options2 = {
  headers: {
    "X-RapidAPI-Key": "5e1b5b32c4mshad5b1b1f3e1c3c4p1b95fcjsn83a801dd00aa",
    "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
  },
};
