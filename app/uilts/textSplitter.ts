/*
 * @Author: tommy 468369392@qq.com
 * @Date: 2025-03-11 17:03:47
 * @LastEditors: tommy 468369392@qq.com
 * @LastEditTime: 2025-03-11 17:16:01
 * @FilePath: \mySite\app\uilts\textSplitter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// Define SplitType interface since it's being used but not imported
interface SplitType {
  lines: HTMLElement[];
  words: HTMLElement[];
  chars: HTMLElement[];
  split(): void;
}

declare class SplitType {
  constructor(element: HTMLElement, options?: { types?: string[] });
  lines: HTMLElement[];
  words: HTMLElement[];
  chars: HTMLElement[];
  split(): void;
}

// Define TextSplitterOptions interface
interface TextSplitterOptions {
  resizeCallback?: () => void;
  splitTypeTypes?: string[];
  [key: string]: any;
}

// Defines a debounce function to limit the rate at which a function can fire.
export const debounce = <T extends (...args: any[]) => any>(func: T, delay: number): ((...args: Parameters<T>) => void) => {
  let timerId: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args); // Calls the passed function after the specified delay with the correct context and arguments.
    }, delay);
  };
};

// Defines a class to split text into lines, words and characters for animation.
export class TextSplitter {
  private textElement: HTMLElement;
  private splitText: SplitType;
  private onResize: (() => void) | null;
  private previousContainerWidth: number | null = null;

  // Constructor for TextScrollEffect which sets up the text animation.
  // Parameters:
  //   textElement: HTMLElement - The DOM element that contains the text to be animated.
  //   options: Object (optional) - Configuration options for the text splitting and callbacks.
  // This constructor initializes the text splitting with specified options, sets up resize handling,
  // and prepares the text element for animation effects.
  constructor(textElement: HTMLElement, options: TextSplitterOptions = {}) {
    // Ensure the textElement is a valid HTMLElement.
    if (!textElement || !(textElement instanceof HTMLElement)) {
      throw new Error('Invalid text element provided.');
    }

    const { resizeCallback, splitTypeTypes } = options;
    
    this.textElement = textElement;
    // Assign the resize callback if provided and is a function, otherwise null.
    this.onResize = typeof resizeCallback === 'function' ? resizeCallback : null;
    
    // Set options for SplitType based on provided splitTypeTypes or default to SplitType's default behavior.
    // The 'types' option allows customization of how text is split (e.g., into lines, words, characters).
    // Refer to SplitType documentation for possible values and updates: https://github.com/lukePeavey/SplitType
    const splitOptions = splitTypeTypes ? { types: splitTypeTypes } : {};
    this.splitText = new SplitType(this.textElement, splitOptions) as SplitType;

    // Initialize ResizeObserver to re-split text on resize events, if a resize callback is provided.
    if (this.onResize) {
      this.initResizeObserver(); // Set up observer to detect resize events.
    }
  }

  // Sets up ResizeObserver to re-split text on element resize.
  initResizeObserver(): void {
    const resizeObserver = new ResizeObserver(
      debounce((entries: ResizeObserverEntry[]) => this.handleResize(entries), 100)
    );
    resizeObserver.observe(this.textElement); // Start observing the text element.
  }

  // Handles element resize, re-splitting text if width changes.
  handleResize(entries: ResizeObserverEntry[]): void {
    const [{ contentRect }] = entries;
    const width = Math.floor(contentRect.width);
    // If element width changed, re-split text and call resize callback.
    if (this.previousContainerWidth !== null && this.previousContainerWidth !== width) {
      this.splitText.split(); // Re-split text for new width.
      if (this.onResize) this.onResize(); // Execute the callback function.
    }
    this.previousContainerWidth = width; // Update stored width.
  }

  // Returns the lines created by splitting the text element.
  getLines(): HTMLElement[] {
    return this.splitText.lines;
  }

  // Returns the words created by splitting the text element.
  getWords(): HTMLElement[] {
    return this.splitText.words;
  }

  // Returns the chars created by splitting the text element.
  getChars(): HTMLElement[] {
    return this.splitText.chars;
  }
}
