import axios from "axios";

export default {
  callApi: async function (method, url, param) {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      if (method === "get") {
        config.params = param;
      }

      const res = await axios[method || "post"](url, param, config);

      const data = res.data;
      const { resultCode, resultData, resultMsg } = data || {};

      // resultCode 기반 응답 형태일 때 처리(내부 API)
      if (resultCode !== undefined) {
        if (resultCode === 0) return resultData;
        throw new Error(resultMsg);
      }

      // resultCode 없는 API (Upbit, 외부API)
      return data;

    } catch (err) {
      throw err;
    }
  },
};
