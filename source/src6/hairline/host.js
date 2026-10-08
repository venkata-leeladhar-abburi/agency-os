/*
 * The host: what the Hairline bench does for a figure, done for a plate on our page.
 * A figure file ends with hairline({ name, means, rules, range, mount }); this keeps it
 * under its name, and the page's module script mounts it on every [data-hl="<name>"] plate.
 */
(() => {
  const figs = (window.__poFigures = window.__poFigures || {});
  let injected = false;
  window.hairline = (fig) => {
    figs[fig.name] = (stage, onRead) => {
      if (!injected) { HL.inject(document); injected = true; }
      stage.setAttribute('data-hairline', fig.name);
      stage.setAttribute('data-hairline-theme', stage.dataset.hlTheme || 'dark');
      stage.setAttribute('role', 'img');
      stage.setAttribute('aria-label', stage.dataset.hlLabel || fig.means);
      const svg = HL.mk('svg', { viewBox: '0 0 400 320', 'aria-hidden': 'true' }, stage);
      let text = null;
      const read = {
        get textContent() { return text; },
        set textContent(v) { text = v == null ? '' : String(v); onRead(text); },
      };
      const handle = fig.mount({ stage, svg, read }, fig.range[1]);
      if (text === null) read.textContent = 'rest';
      return handle;
    };
  };
})();
