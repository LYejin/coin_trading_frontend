import axios from "axios";

export default {
  callApi: async function (method, url, param) {
    try {
      method = method.toLowerCase();

      if (method === "get") {
        const res = await axios.get(url, {
          params: param,
          headers: { "Content-Type": "application/json" },
        });
        return res.data;
      }

      // POST, PUT 등
      const res = await axios({
        method,
        url,
        data: param,
        headers: { "Content-Type": "application/json" },
      });

      const data = res.data;
      const { resultCode, resultData, resultMsg } = data || {};

      if (resultCode !== undefined) {
        if (resultCode === 0) return resultData;
        throw new Error(resultMsg);
      }

      return data;
    } catch (err) {
      throw err;
    }
  },
};
