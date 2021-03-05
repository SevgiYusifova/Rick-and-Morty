import environment from "../environment/environment";
import axios from "axios";

/**
 *
 * @param {function} createElement funtion for create needed object
 * @param {string} url request url, may be nextPage url
 * @param {string} type entity name
 */
export const loadData = async (createElement, url, type) => {
  url = url ? url : `${environment.baseUrl}/${type}`;

  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      return {
        data: response.data.results.map((element) => createElement(element)),
        nextPage: response.data.info.next,
      };
    }
  } catch (error) {
    console.log(error);
    return { data: [], nextPage: "" };
  }
};
