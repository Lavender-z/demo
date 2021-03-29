(() => { 

    // 状态变量
    let toDoListArray = [];

    // ui 变量
    const form = document.querySelector(".form"); 
    const input = form.querySelector(".form_input");
    const ul = document.querySelector(".toDoList"); 
  
    // 事件监听
    form.addEventListener('submit', e => {
      
      // 页面重新加载时防止默认行为
      e.preventDefault();
      
      // 为项提供唯一 ID
      let itemId = String(Date.now());
      
      // 获取和分配输入值
      let toDoItem = input.value;
      
      // 将 ID 和项传递到函数中
      addItemToDOM(itemId , toDoItem);
      addItemToArray(itemId, toDoItem);
      
      // 清除输入框
      input.value = '';
    });
    
    ul.addEventListener('click', e => {
      let id = e.target.getAttribute('data-id')
      if (!id) return 
      
      // 传递 id 到函数
      removeItemFromDOM(id);
      removeItemFromArray(id);
    });
    
    function addItemToDOM(itemId, toDoItem) {    
      
      // 创建一个列表
      const li = document.createElement('li')
      li.setAttribute("data-id", itemId);
      
      // 将 todoItem 中的内容添加到列表中
      li.innerText = toDoItem
      
      // 将 li 添加到 DOM
      ul.appendChild(li);
    }
    
    function addItemToArray(itemId, toDoItem) {
      
      // 将项作为 ID 为的对象添加到数组中，以便以后可以查找和删除它
      toDoListArray.push({ itemId, toDoItem});
      console.log(toDoListArray)
    }
    
    function removeItemFromDOM(id) {
    
      // 按数据 ID 获取列表项
      var li = document.querySelector('[data-id="' + id + '"]');
      
      // 删除列表项
      ul.removeChild(li);
    }
    
    function removeItemFromArray(id) {
      
      // 创建一个新的 toDoListArray，包含所有与 ID 不匹配的列表
      toDoListArray = toDoListArray.filter(item => item.itemId !== id);
      console.log(toDoListArray);
    }
    
  })();