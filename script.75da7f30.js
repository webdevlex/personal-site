// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
// Scrolls to top on landing or refresh
window.scrollTo(0, 0); // helpers

function getElement(className) {
  return document.querySelector(className);
} // Setup mobile menu button to open on click


var mobileMenuButton = getElement('.mobile-menu-button');
mobileMenuButton.addEventListener('click', function () {
  return toggleMenu();
});
var menuOpen = false;

function toggleMenu() {
  menuOpen = !menuOpen;
  toggleFade();
  animateMenuButton();
  toggleLockScroll();
}

function toggleFade() {
  getElement('.navbar-menu').classList.toggle('fade');
}

function animateMenuButton() {
  getElement('.top-line').classList.toggle('animate-top-line');
  getElement('.bottom-line').classList.toggle('animate-bottom-line');
}

function toggleLockScroll() {
  var body = document.getElementsByTagName('body')[0];
  body.classList.toggle('stop-scrolling');
} // Setup navigation buttons to scroll to section on click


var navbar = getElement('.navbar-menu');
navbar.addEventListener('click', function (e) {
  return handleNavbarClick(e.target.id);
});

function handleNavbarClick(id) {
  if (buttonIsScroller(id)) {
    var section = ".home-".concat(id);
    smoothScrollTo(section);
  }
}

function buttonIsScroller(id) {
  return id !== 'contact';
}

function smoothScrollTo(section) {
  if (menuOpen) toggleMenu();
  var pos = getPosOf(section);
  window.scrollTo(pos);
}

function getPosOf(section) {
  var element = getElement(section);
  var pos = element.getBoundingClientRect().top + window.scrollY;
  var scrollObject = {
    top: pos,
    left: 0,
    behavior: 'smooth'
  };
  return scrollObject;
} // Setup contact window buttons to open contact form when clicked


document.querySelectorAll('.contact-btn').forEach(function (button) {
  return button.addEventListener('click', function () {
    return toggleContactWindow();
  });
});

function toggleContactWindow() {
  toggleSlideIn();
  toggleLockScroll();
  toggleBackground();
}

function toggleSlideIn() {
  var contactWindow = getElement('.contact-container');

  if (contactWindow.classList.contains('hide-contact')) {
    contactWindow.classList.remove('hide-contact');
    contactWindow.classList.add('slide-in');
  } else {
    contactWindow.classList.add('hide-contact');
    contactWindow.classList.remove('slide-in');
  }
}

function toggleBackground() {
  getElement('.contact-bg').classList.toggle('show-bg');
} // Setup projects carousel to shift left or right on click


document.querySelectorAll('.left-scroller').forEach(function (scroller) {
  return scroller.addEventListener('click', function () {
    return shiftLeft();
  });
});
document.querySelectorAll('.right-scroller').forEach(function (scroller) {
  return scroller.addEventListener('click', function () {
    return shiftRight();
  });
});

function shiftLeft() {
  // rotateIfLogoNotFacingUser();
  temporarlyTurnOffPointerEvents();
  var leftProject = getElement('.left-project');
  var centerProject = getElement('.center-project');
  var rightProject = getElement('.right-project');
  shiftLeftProjectToCenter(leftProject);
  shiftCenterProjectToRight(centerProject);
  shiftRightProjectToLeft(rightProject);
}

function rotateIfLogoNotFacingUser() {
  var centerProject = document.querySelector('.center-project');
  var logoFacingUser = centerProject.getAttribute('isLogoFacingUser');

  if (logoFacingUser === 'false') {
    toggleRotate(centerProject);
  }
}

function shiftLeftProjectToCenter(leftProject) {
  leftProject.classList.remove('left-project'); // -----------------------------------------

  leftProject.classList.add('center-project'); // -----------------------------------------
}

function shiftCenterProjectToRight(centerProject) {
  centerProject.classList.remove('center-project'); // -----------------------------------------

  centerProject.classList.add('right-project'); // -----------------------------------------
}

function shiftRightProjectToLeft(rightProject) {
  rightProject.classList.remove('right-project'); // -----------------------------------------

  rightProject.classList.add('left-project'); // -----------------------------------------
}

function shiftRight() {
  // rotateIfLogoNotFacingUser();
  temporarlyTurnOffPointerEvents();
  var leftProject = getElement('.left-project');
  var centerProject = getElement('.center-project');
  var rightProject = getElement('.right-project');
  shiftLeftProjectToRight(leftProject);
  shiftCenterProjectToLeft(centerProject);
  shiftRightProjectToCenter(rightProject);
}

function shiftLeftProjectToRight(leftProject) {
  leftProject.classList.remove('left-project'); // -----------------------------------------

  leftProject.classList.add('right-project'); // -----------------------------------------
}

function shiftCenterProjectToLeft(centerProject) {
  centerProject.classList.remove('center-project'); // -----------------------------------------

  centerProject.classList.add('left-project'); // -----------------------------------------
}

function shiftRightProjectToCenter(rightProject) {
  rightProject.classList.remove('right-project'); // -----------------------------------------

  rightProject.classList.add('center-project'); // -----------------------------------------
}

function temporarlyTurnOffPointerEvents() {
  turnOffPointerEvents();
  setTimeout(function () {
    return turnOnPointerEvents();
  }, 600);
}

function turnOffPointerEvents() {
  document.querySelectorAll('.scroll-button').forEach(function (button) {
    return button.style.pointerEvents = 'none';
  });
  document.querySelectorAll('.scroller').forEach(function (scroller) {
    return scroller.style.pointerEvents = 'none';
  });
}

function turnOnPointerEvents() {
  document.querySelectorAll('.scroll-button').forEach(function (button) {
    return button.style.pointerEvents = 'all';
  });
  document.querySelectorAll('.scroller').forEach(function (scroller) {
    return scroller.style.pointerEvents = 'all';
  });
} // Setup center project to rotate on hover and click


var projects = document.querySelectorAll('.project');
projects.forEach(function (project) {
  project.setAttribute('isLogoFacingUser', true);
  project.addEventListener('click', function (e) {
    return handleProjectClicked(e);
  });
});

function handleProjectClicked(e) {
  var viewportWidth = getViewportWidth();
  var projectClicked = e.target;
  var centerProjectClicked = projectClicked.classList.contains('center-project');

  if (viewportWidth < 576 || centerProjectClicked) {
    toggleRotate(projectClicked);
  } else {
    var leftProjectClicked = projectClicked.classList.contains('left-project');
    var rightProjectClicked = projectClicked.classList.contains('right-project');

    if (leftProjectClicked) {
      shiftLeft();
    } else if (rightProjectClicked) {
      shiftRight();
    }
  }
}

function toggleRotate(element) {
  var logoFacingUser = element.getAttribute('isLogoFacingUser');

  if (logoFacingUser == 'true') {
    element.setAttribute('isLogoFacingUser', false);
  } else {
    element.setAttribute('isLogoFacingUser', true);
  }

  var elementToRotate = element.querySelector('.project-rotater');
  elementToRotate.classList.toggle('rotate');
}

function getViewportWidth() {
  return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
} // Setup up bottom right contact button to show when no other contact buttons are on screen


var intersectionButtons = document.querySelectorAll('.intersection');
var contactButton = getElement('.contact-button');
var options = {
  root: null,
  threshhold: 0,
  rootMargin: '0px'
};
var observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach(function (entry) {
    contactButton.classList.toggle('show-contact-button');
  });
}, options);
intersectionButtons.forEach(function (button) {
  observer.observe(button);
}); // Setup for send email button

document.querySelector('.send-button').addEventListener('click', function () {
  return attemptToSendEmail();
});

function attemptToSendEmail() {
  var form = document.querySelector('.form');
  var name = form.elements['name'].value;
  var email = form.elements['email'].value;
  var subject = form.elements['subject'].value;
  var message = form.elements['message'].value;
  var fields = {
    name: name,
    email: email,
    subject: subject,
    message: message
  };
  var errorsExist = false;
  Object.entries(fields).forEach(function (field) {
    var fieldError = validateField(field);

    if (fieldError) {
      errorsExist = true;
    }
  });
  resetAnimation();
  startLoadingAnimation();

  if (!errorsExist) {
    sendEmail(fields);
  } else {
    messageFailed({
      status: 0,
      text: 'Missing required field'
    });
  }
}

function validateField(field) {
  var fieldName = field[0];
  var value = field[1];

  if (!value) {
    markFieldAsError(fieldName);
    return fieldName;
  } else if (fieldName === 'email' && !validateEmail(value)) {
    markFieldAsError(fieldName);
    return fieldName;
  } else {
    removeError(fieldName);
  }
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function markFieldAsError(fieldName) {
  var form = document.querySelector('.form');
  form.elements[fieldName].parentNode.classList.add('error');
}

function removeError(fieldName) {
  var form = document.querySelector('.form');
  form.elements[fieldName].parentNode.classList.remove('error');
}

function sendEmail(params) {
  emailjs.send('default_service', 'template_vr6w86n', params).then(function (response) {
    return messageSuccess(response, params);
  }, function (error) {
    return messageFailed(error);
  });
}

function startLoadingAnimation() {
  var loader = document.querySelector('.loader');
  loader.classList.add('active');
}

function messageSuccess(response, params) {
  console.log('Email sent successfully!');
  sendNotification(params);
  delaySuccessAnimation(0);
  delayCloseContactWindow(1500);
  delayClearInputs(2500);
  delayResetAnimation(2000);
}

function sendNotification(params) {
  emailjs.send('default_service', 'template_tzksk1i', params).then(function () {
    return console.log('Notification sent successfully!');
  }, function () {
    return console.log('Notification failed to send...');
  });
}

function delaySuccessAnimation(delay) {
  setTimeout(function () {
    successAnimation();
  }, delay);
}

function successAnimation() {
  var loader = document.querySelector('.loader');
  var check = document.querySelector('.check');
  loader.classList.add('success');
  check.classList.add('active');
}

function delayCloseContactWindow(delay) {
  setTimeout(function () {
    toggleContactWindow();
  }, delay);
}

function delayClearInputs(delay) {
  setTimeout(function () {
    clearInputs();
  }, delay);
}

function clearInputs() {
  var form = document.querySelector('.form');
  form.elements['name'].value = '';
  form.elements['email'].value = '';
  form.elements['subject'].value = '';
  form.elements['message'].value = '';
}

function delayResetAnimation(delay) {
  setTimeout(function () {
    resetAnimation();
  }, delay);
}

function resetAnimation() {
  var loader = document.querySelector('.loader');
  var exclamation = document.querySelector('.exclamation');
  var check = document.querySelector('.check');
  var contactWindow = document.querySelector('.contact-container');
  loader.classList.remove('active');
  loader.classList.remove('success');
  loader.classList.remove('failed');
  exclamation.classList.remove('active');
  check.classList.remove('active');
  contactWindow.classList.remove('errors');
}

function messageFailed(error) {
  console.log('Email failed to send...');
  delayFailedAnimation(10);
}

function delayFailedAnimation(delay) {
  setTimeout(function () {
    failedAnimation();
  }, delay);
}

function failedAnimation() {
  var slideIn = document.querySelector('.slide-in');
  var loader = document.querySelector('.loader');
  var exclamation = document.querySelector('.exclamation');
  exclamation.classList.add('active');
  loader.classList.add('failed');
  slideIn.classList.add('errors');
}
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59169" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=--out-dir/script.75da7f30.js.map