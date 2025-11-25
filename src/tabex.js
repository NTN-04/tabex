function Tabex(selector) {
  this.container = document.querySelector(selector);
  if (!this.container) {
    console.error(`Tabex: No container found for selector ${selector}.`);
    return;
  }

  this.tabs = Array.from(document.querySelectorAll("li a"));
  if (!this.tabs.length) {
    console.error(`Tabex: No tab found inside container`);
    return;
  }

  this.panels = this.tabs
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

  if (this.tabs.length !== this.panels.length) return;

  this._originHtml = this.container.innerHTML;
  console.log("🚀 ~ Tabex ~ this._originHtml:", this._originHtml);
  // Hàm Khởi tạo
  this._init();
}

Tabex.prototype._init = function () {
  this._activeTab(this.tabs[0]);

  this.tabs.forEach((tab) => {
    tab.onclick = (e) => this._handleClickTab(e, tab);
  });
};

Tabex.prototype._handleClickTab = function (e, tab) {
  e.preventDefault();
  this._activeTab(tab);
};

Tabex.prototype._activeTab = function (tab) {
  // Xóa và Thêm active khi click
  this.tabs.forEach((tab) => {
    tab.closest("li").classList.remove("tabex--active");
  });

  tab.closest("li").classList.add("tabex--active");

  // Ẩn/Hiện panel tương ứng
  this.panels.forEach((panel) => (panel.hidden = true));

  const panelActive = document.querySelector(tab.getAttribute("href"));
  panelActive.hidden = false;
};

Tabex.prototype.switch = function (input) {
  let tabToActive = null;

  if (typeof input === "string") {
    tabToActive = this.tabs.find((tab) => tab.getAttribute("href") === input);
    if (!tabToActive) {
      console.error(`Tabex: No tab found with ID '${input}'`);
      return;
    }
  } else if (this.tabs.includes(input)) {
    tabToActive = input;
  }

  if (!tabToActive) {
    console.error(`Tabex: Invalid input '${input}'`);
    return;
  }
  this._activeTab(tabToActive);
};

Tabex.prototype.destroy = function () {
  this.container.innerHTML = this._originHtml;
  this.panels.forEach((panel) => (panel.hidden = false));
  this.container = null;
  this.tabs = null;
  this.panels = null;
};
