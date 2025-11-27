function Tabex(selector, option = {}) {
  this.container = document.querySelector(selector);
  if (!this.container) {
    console.error(`Tabex: No container found for selector ${selector}.`);
    return;
  }

  this.tabs = Array.from(this.container.querySelectorAll("li a"));
  if (!this.tabs.length) {
    console.error(`Tabex: No tab found inside container`);
    return;
  }

  this.panels = this.getPanels();

  if (this.tabs.length !== this.panels.length) return;

  this.opt = Object.assign(
    {
      activeClassName: "tabex--active",
      remember: false,
      onChange: null,
    },
    option
  );

  this.paramKey = selector.replace(/[^a-zA-Z0-9]/g, "");

  this._originHtml = this.container.innerHTML;
  // Hàm Khởi tạo
  this._init();
}

Tabex.prototype.getPanels = function () {
  return this.tabs
    .map((tab) => {
      const panel = document.querySelector(tab.getAttribute("href"));
      if (!panel) {
        console.error(
          `Tabex: No panel found for selector '${tab.getAttribute("href")}'`
        );
      }
      return panel;
    })
    .filter(Boolean);
};

Tabex.prototype._init = function () {
  const param = new URLSearchParams(location.search);
  const tabSelector = param.get(this.paramKey);
  const tabToActivate =
    (this.opt.remember &&
      tabSelector &&
      this.tabs.find(
        (tab) =>
          tab.getAttribute("href").replace(/[^a-zA-Z0-9]/g, "") === tabSelector
      )) ||
    this.tabs[0];

  this.currentTab = tabToActivate;
  this._activeTab(tabToActivate, false, false);

  this.tabs.forEach((tab) => {
    tab.onclick = (e) => this._handleClickTab(e, tab);
  });
};

Tabex.prototype._handleClickTab = function (e, tab) {
  e.preventDefault();
  if (this.currentTab !== tab) {
    this._activeTab(tab);
    this.currentTab = tab;
  }
};

Tabex.prototype._activeTab = function (
  tab,
  triggerOnChange = true,
  updateURL = this.opt.remember
) {
  // Xóa và Thêm active khi click
  this.tabs.forEach((tab) => {
    tab.closest("li").classList.remove(this.opt.activeClassName);
  });

  tab.closest("li").classList.add(this.opt.activeClassName);

  // Ẩn/Hiện panel tương ứng
  this.panels.forEach((panel) => (panel.hidden = true));

  const panelActive = document.querySelector(tab.getAttribute("href"));
  panelActive.hidden = false;

  // Lưu tab ở hash
  if (updateURL) {
    const param = new URLSearchParams(location.search);
    const paramValue = tab.getAttribute("href").replace(/[^a-zA-Z0-9]/g, "");
    param.set(this.paramKey, paramValue);
    history.replaceState(null, null, `?${param}`);
  }

  // Option hàm onchange
  if (triggerOnChange && typeof this.opt.onChange === "function") {
    this.opt.onChange({
      tab,
      panel: panelActive,
    });
  }
};

Tabex.prototype.switch = function (input) {
  let tabToActive = null;

  if (typeof input === "string") {
    tabToActive = this.tabs.find((tab) => tab.getAttribute("href") === input);
  } else if (this.tabs.includes(input)) {
    tabToActive = input;
  }

  if (!tabToActive) {
    console.error(`Tabex: Invalid input '${input}'`);
    return;
  }

  if (this.currentTab !== tabToActive) {
    this._activeTab(tabToActive);
    this.currentTab = tabToActive;
  }
};

Tabex.prototype.destroy = function () {
  this.container.innerHTML = this._originHtml;
  this.panels.forEach((panel) => (panel.hidden = false));
  this.container = null;
  this.tabs = null;
  this.panels = null;
  this.currentTab = null;
};
