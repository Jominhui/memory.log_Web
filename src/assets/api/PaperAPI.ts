import axios from "axios";
import { SERVER } from "../../config/config.json";

class PaperAPI {
  async GetPapers(idx?: number, code?: string) {
    try {
      let url = `${SERVER}/paper/showPaper`;

      if (idx && code) {
        url += `?paper_idx=${idx}&code=${code}`
      } else if (idx) {
        url += `?idx=${idx}`
      }

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async GetMyPapers() {
    try {
      const url = `${SERVER}/paper/getMyPaper`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async SearchPaper(target: string) {
    try {
      const url = `${SERVER}/paper/searchPaper/?target=${target}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new PaperAPI();
