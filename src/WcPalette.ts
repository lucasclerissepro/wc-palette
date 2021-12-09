import { html, css, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { minireset } from 'minireset.css/minireset.css.lit.js';
import Fuse from 'fuse.js';

const paletteStyle = css`
  .selected {
    background-color: hotpink;
  }
`;

interface Command {
  name: string;
  labels: Array<string>;
  used: number;
}

const commands = [
  { name: 'Restart service', labels: [], used: 0 },
  { name: 'Deploy new golang service', labels: [], used: 0 },
  { name: 'Setup new prometheus alert', labels: [], used: 0 },
  { name: 'Change theme', labels: [], used: 0 },
  { name: 'Clone repository', labels: [], used: 0 },
  { name: 'Prettify', labels: [], used: 0 },
];

export class WcPalette extends LitElement {
  static styles = [minireset, paletteStyle];

  @state()
  protected _selectedResultIdx = 0;

  @state()
  protected _maxResults: number = 10;

  @state()
  protected filteredCommands: Array<Command> = [];

  private _fuse: any = null;

  protected _focusSearch() {
    const searchBox = this._getSearchBox();
    if (searchBox) searchBox.focus();
  }

  private _runSelectedCommand() {
    this.filteredCommands[this._selectedResultIdx].used += 1;
  }

  private _resetSelectionCursor() {
    this._selectedResultIdx = 0;
  }

  private _getSearchBox(): HTMLInputElement | null {
    return this.shadowRoot?.getElementById('search-box') as any;
  }

  private _handleSearch(criteria: string) {
    this.filteredCommands = this._fuse
      .search(criteria)
      .map(entry => entry.item);
    this._maxResults = this.filteredCommands.length - 1;
    this._sortResultsByUsage();
  }

  private _sortResultsByUsage() {
    this.filteredCommands = this.filteredCommands.sort((a, b): number => {
      if (a.used > b.used) return -1;
      if (a.used < b.used) return 1;
      return 0;
    });
  }

  private _handleKeydown(e: KeyboardEvent) {
    const handlers: Object = {
      ArrowUp: () => {
        e.preventDefault();
        this._selectedResultIdx = Math.max(0, this._selectedResultIdx - 1);
      },
      ArrowDown: () => {
        e.preventDefault();
        this._selectedResultIdx = Math.min(
          this._maxResults,
          this._selectedResultIdx + 1
        );
      },
      Enter: () => {
        e.preventDefault();
        this._runSelectedCommand();
      },
    };

    if (e.key.toString() in handlers) {
      const handler = handlers[e.key.toString()];
      handler();
    } else {
      const searchBox = this._getSearchBox();

      this._resetSelectionCursor();

      if (searchBox != null) {
        this._handleSearch(searchBox.value);
      }
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    const options = {
      keys: ['name', 'labels'],
    };

    this._fuse = new Fuse(commands, options);
    this.filteredCommands = commands;
    this._sortResultsByUsage();
  }

  protected updated(): void {
    this._focusSearch();
  }

  render() {
    return html`
      <div class="command-palette">
        <div part="search-area" class="search-area">
          <input
            @keydown=${this._handleKeydown}
            id="search-box"
            class="search-box"
            type="text"
            placeholder="Type command..."
          />
        </div>

        <ul>
          ${this.filteredCommands.map(
            (cmd, idx) => html`
              <li class="${this._selectedResultIdx === idx && 'selected'}">
                ${cmd.name} - ${cmd.used}
              </li>
            `
          )}
        </ul>
      </div>
    `;
  }
}
