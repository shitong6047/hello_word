 # onInit 方法
 此方法类似react的componentWillMount，在这里初始化你的参数
 传进来的actionBody 为上一次保存过的数据，或者空对象
 ```
  onInit = (actionBody) => {
     this.setState({
        name: actionBody.name
     });
   };
   
 ```
 # onConfirm 方法
 当用户点击确认会触发此方法，没有参数
 需要返回一个包含actionBody的对象,  actionBody的值会在下次打开时作为onInit的参数传入
 ```
 {
    actionBody: { name }
 }
 ```
 
 如果不能立即保存则返回一个包含error对象
 ```{
        error: {
          type: 'error',
          message: '请输入名称'
        }
      }
 ```