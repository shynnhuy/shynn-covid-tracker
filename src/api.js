import Axios from "axios";

export default Axios.create({
  baseURL: "https://disease.sh/v3/covid-19"
});
