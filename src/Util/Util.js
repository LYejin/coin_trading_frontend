import axios from "axios";

export default {
  callApi: async function (method, url, param) {
    try {
      const res = await axios[method || "post"](url, param, {
        headers: { "Content-Type": "application/json" }
      });

      const { resultCode, resultData, resultMsg } = res.data;

      if (resultCode === 0) return resultData;
      else throw new Error(resultMsg);

    } catch (err) {
      throw err;
    }
  },
};
