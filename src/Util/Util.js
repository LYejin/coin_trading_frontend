export default {
  async callApi(url, param, ajax) {
    try {
      const { resultCode, resultData, resultMsg } =
        await ajax.post(url, param, { contentType: "application/json" });

      if (resultCode === 0) return resultData;
      else throw new Error(resultMsg);
    } catch (err) {
      throw err;
    }
  }
};
