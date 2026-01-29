import { retrieveRawInitData } from "@tma.js/sdk";

const initDataRaw = retrieveRawInitData();

fetch("https://example.com/api", {
  method: "POST",
  headers: {
    Authorization: `tma ${initDataRaw}`,
  },
});
