Array.prototype.shuffle = function() {
  const input = this;
  for (let i = input.length-1; i >=0; i--) {
    const randomIndex = Math.floor(Math.random()*(i+1));
    let itemAtIndex = input[randomIndex];
    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
};

(function() {
  var poolList = document.querySelector('.js-pool-list');
  var header = poolList.querySelector('.js-pool-header');
  var pools = poolList.querySelectorAll('.js-pool-group');
  var shuffledPools = Array.prototype.slice.call(pools).shuffle();
  var fragment = document.createDocumentFragment();
  var shuffledPoolList = poolList.cloneNode(false);
  var proxy = 'https://powerful-sea-54885.herokuapp.com/';
  var proxyFallback = 'https://cors-anywhere.herokuapp.com/';
  var rowReadyClass = 'pool__row-group--ready';
  var stateReadyClass = 'pool__data--ready';
  var messages = [
    {
      text: 'Synchronized with the main network. Normal operation.',
      icon: function() {
        return createIconNode(poolStatusMsg.on, 'up', 'ion-md-checkmark')
      }
    },
    {
      text: 'Connected to the main network. Synchronizing.',
      icon: function() {
        return createIconNode(poolStatusMsg.sync, 'sync', 'ion-ios-flash')
      }
    },
    {
      text: 'Loading blocks from the local storage.',
      icon: function() {
        return createIconNode(poolStatusMsg.init, 'init', 'ion-ios-flash')
      }
    },
    {
      text: 'Can\'t connect to unix domain socket errno:111',
      icon: function() {
        return createIconNode(poolStatusMsg.down, 'down', 'ion-md-close')
      }
    }
  ];
  var messageFallbackIcon = function() {
    return createIconNode(poolStatusMsg.unknown, 'unknown', 'ion-md-help');
  }

  fragment.appendChild(header);
  Array.prototype.forEach.call(shuffledPools, function(poolGroup) {
    poolGroup.classList.add(rowReadyClass)
    fragment.appendChild(poolGroup);
  });
  shuffledPoolList.appendChild(fragment);
  poolList.parentNode.replaceChild(shuffledPoolList, poolList);
  renderPoolStates();

  function createIconNode(tooltip, stateClass, iconClass) {
    var container = document.createElement('span');
    container.className = 'xdag-tooltip pool__state-icon pool__state-icon--' + stateClass;
    container.dataset.tooltip = tooltip;

    var icon = document.createElement('i');
    icon.className = iconClass;

    container.appendChild(icon)
    return container;
  }

  function renderPoolStates() {
    Array.prototype.forEach.call(shuffledPools, function(poolGroup) {
      var stateNodes = poolGroup.querySelectorAll('.js-pool-state');

      Array.prototype.forEach.call(stateNodes, function(stateNode) {
        let url = stateNode.dataset.state;

        if (url === '') {
          stateNode.appendChild(messageFallbackIcon);
          stateNode.classList.add(stateReadyClass);
        } else {
          handleStateCheck(url, stateNode, true);
        }
      });
    });
  }

  function handleStateCheck(url, stateNode, firstRun) {
    $.ajax({
      url: proxy + url,
      type: 'GET',
      success: function(res) {
        res = res.state ? res.state : res;
        
        var message = messages.find(function(message) {
          return res.indexOf(message.text) > -1;
        });

        if (message !== undefined) {
          stateNode.appendChild(message.icon());
        } else {
          stateNode.appendChild(messageFallbackIcon());
        }

        stateNode.classList.add(stateReadyClass);
      },
      error: function(res) {
        if (firstRun) {
          proxy = proxyFallback;
          handleStateCheck(url, stateNode, false);
        } else {
          stateNode.appendChild(messageFallbackIcon());
          stateNode.classList.add(stateReadyClass);
        }
      }
    });
  }
})();