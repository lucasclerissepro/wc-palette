import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { WcPalette } from '../src/WcPalette.js';
import '../src/wc-palette.js';

describe('WcPalette', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<WcPalette>(html`<wc-palette></wc-palette>`);

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<WcPalette>(html`<wc-palette></wc-palette>`);
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture<WcPalette>(html`<wc-palette title="attribute title"></wc-palette>`);

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<WcPalette>(html`<wc-palette></wc-palette>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
