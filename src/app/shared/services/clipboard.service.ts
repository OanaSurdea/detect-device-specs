import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClipboardService {
  constructor() {}

  public copy(elementId: string): void {
    const element = document.getElementById(elementId);

    let body = document.body;
    let range: Range;
    let selection: Selection;

    if (document.createRange && window.getSelection) {
      range = document.createRange();
      selection = window.getSelection();
      selection.removeAllRanges();

      try {
        range.selectNodeContents(element);
        selection.addRange(range);
      } catch (e) {
        range.selectNode(element);
        selection.addRange(range);
      }
    } else if ((body as any).createTextRange) {
      range = (body as any).createTextRange();
      (range as any).moveToElementText(element);
      (range as any).select();
    }

    document.execCommand('copy');
    selection.removeAllRanges();
  }
}
