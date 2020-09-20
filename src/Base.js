/**
 * Created by huangling on 15/2/2017.
 */
import React from 'react';

export default class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    window.addEventListener('message', (e) => {
      const data = e.data;
      if(data && data.type) {
        if (data.type === 'onInit') {
          this.onInit(data.content);
        } else if (data.type === 'onConfirm') {
          const data = this.onConfirm();
          this.__sendMessage(data);
        }
      }
    },false);
  }

  __sendMessage = (content) => {
    window.parent.postMessage({
      type: 'cpFinish',
      content: content
    }, '*');
  };
}
