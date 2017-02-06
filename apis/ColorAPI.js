import JsonResponseMiddleware from "react-server-middleware-json-response";
import {logging} from 'react-server';

const logger = logging.getLogger(__LOGGER__);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// randomly pick a color
export default class ColorAPI {
  static middleware() {
    return [JsonResponseMiddleware];
  }

  getResponseData() {
    const req = this.getRequest();
    const params = req.getQuery();
    logger.debug('params:', params);
    const part = params.part ? params.part : 'head';
    let delay = 2000;
    const colors = ['pink', 'lightblue', 'gray', 'red', 'aquamarine',
      'dodgerblue', 'cyan'];
    const colorIndex = getRandomInt(0, colors.length);
    const color = colors[colorIndex];
    if (part === 'body') {
      delay = 5000;
    } else if (part === 'footer') {
      delay = 6000;
    }

    return new Promise((resolve) => {
      setTimeout(()=> {
        resolve({color: color});
      }, delay);
    });
  }
}
