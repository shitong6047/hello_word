import axios from 'axios';

const BASIC_PATH = "https://app.convertlab.com/";

const loadMsgTemplates = (channelId) => {
    let url = BASIC_PATH + "appnotification/templates?channelId=" + channelId;
    return axios.get(url);
}

/*const loadChannelIdList = () => {

}*/

export {loadMsgTemplates};