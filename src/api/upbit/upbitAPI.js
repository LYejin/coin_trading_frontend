import Util from "../../Util/Util";

export const ticker = async (data) => {
    return await Util.callApi(
        "get",
        "https://api.upbit.com/v1/ticker",
        { markets: data }
    );
}

export const pair = async (data) => {
    return await Util.callApi(
        "get",
        "https://api.upbit.com/v1/market/all",
        { isDetails: true }
    );
}

