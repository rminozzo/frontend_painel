import axios from "axios";

export default axios.create({
    baseURL:'http://api.adyl.net.br/api-alarmes'
})
