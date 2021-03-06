import axios from "axios";
import { SERVER } from "../../config/config.json";

class ProfileApi {
  async modifyProfile(name?: string, profileImage?: string) {
    try {
      const url = `${SERVER}/member/editInfo`;

      const body = {
        name,
        profileImage
      };

      let config = {};

      if (localStorage.getItem("accessToken")) {
        config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        };
      }

      const { data } = await axios.put(url, body, config);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async uploadProfileImage(files: File) {
    try {
      const url = `${SERVER}/upload/`;

      const formData = new FormData();
      formData.append("file", files);

      let config = {};

      if (localStorage.getItem("accessToken")) {
        config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        };
      }

      const { data } = await axios.post(url, formData, config);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
export default new ProfileApi();
