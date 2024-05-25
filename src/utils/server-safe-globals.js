/* eslint-disable */
// @ts-nocheck

/**
 * This file is a modified version of the `server-safe-globals.js` file from the
 * `media-chrome` package. The purpose of duplicating this file is to allow the
 * building of the reactified version of the Vinyl web components.
 *
 * Eslint and Typescript checks are disabled in this file because it is a direct
 * copy of the original file with minor modifications. The original file can be
 * found at the following link:
 *
 * https://github.com/muxinc/media-chrome/blob/692be61a2a63ba98c7e449d860ce1828b78353a2/src/js/utils/server-safe-globals.js
 */

/**
 * Copyright (c) 2020 Mux, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

class EventTarget {
  addEventListener() {}
  removeEventListener() {}
  dispatchEvent() {
    return true;
  }
}

class Node extends EventTarget {}

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const documentShim = {
  createElement: function () {
    return new globalThisShim.HTMLElement();
  },
  createElementNS: function () {
    return new globalThisShim.HTMLElement();
  },
  addEventListener() {},
  removeEventListener() {},
  /**
   *
   * @param {Event} event
   * @returns {boolean}
   */
  dispatchEvent(event) { return false; }, // eslint-disable-line no-unused-vars
};

const globalThisShim = {
  ResizeObserver,
  document: documentShim,
  Node: Node,
  HTMLElement: class HTMLElement extends Node {},
  DocumentFragment: class DocumentFragment extends EventTarget {},
  customElements: {
    get: function () {},
    define: function () {},
    whenDefined: function () {},
  },
  localStorage: {
    /**
     * @param {string} key
     * @returns {string|null}
    */
    getItem(key) { return null; }, // eslint-disable-line no-unused-vars
    /**
     * @param {string} key
     * @param {string} value
     */
    setItem(key, value) {}, // eslint-disable-line no-unused-vars
    /**
     * @param {string} key
    */
    removeItem(key) {}, // eslint-disable-line no-unused-vars
  },
  CustomEvent: function CustomEvent() {},
  getComputedStyle: function () {},
  navigator: {
    languages: [],
    get userAgent() {
      return '';
    }
  },
  /**
   * @param {string} media
   */
  matchMedia(media) {
    return {
      matches: false,
      media,
    };
  }
};

export const isServer =
  typeof window === 'undefined' ||
  typeof window.customElements === 'undefined';

const isShimmed = Object.keys(globalThisShim)
  .every(key => key in globalThis);

/**
  * @type { globalThis & {
  *   WebKitPlaybackTargetAvailabilityEvent?,
  *   chrome?,
  *   DocumentFragment?,
  *   getComputedStyle,
  *   CastableVideoElement?
  * } |
  * {Node,
  * HTMLElement,
  * customElements,
  * CustomEvent,
  * getComputedStyle,
  * addEventListener?,
  * removeEventListener?,
  * localStorage?,
  * WebKitPlaybackTargetAvailabilityEvent?,
  * window?,
  * document?,
  * chrome?,
  * DocumentFragment?,
  * ResizeObserver?,
  * CastableVideoElement?,
  * navigator?,
  * matchMedia,
  * } }
  * */
export const GlobalThis = isServer && !isShimmed ? globalThisShim : globalThis;

/**
  * @type { document & { webkitExitFullscreen? } |
  * {createElement,
  * createElementNS?,
  * activeElement?,
  * fullscreenElement?,
  * webkitExitFullscreen?,
  * getElementById?,
  * pictureInPictureElement?,
  * exitPictureInPicture?,
  * pictureInPictureEnabled?,
  * requestPictureInPicture?,
  * addEventListener?,
  * removeEventListener?,
  * } }
  */
export const Document = isServer && !isShimmed ? documentShim : globalThis.document;

export {
  GlobalThis as globalThis,
  Document as document
};
