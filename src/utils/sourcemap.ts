import { SourceMapConsumer } from 'source-map';

const consumer = new SourceMapConsumer(require('sourcemap'));

export const generateStackTrace = (error: Error | string): string => {
  const stack: string = error instanceof Error ? (error.stack as string) : error;

  const regex = /^\s+at\s+(.+?\s+)?\(?([0-z._\-\\\/]+):(\d+):(\d+)\)?$/gm;
  let match: RegExpExecArray | null;
  let outStack = error.toString();

  while ((match = regex.exec(stack))) {
    if (match[2] !== 'main') {
      break;
    }

    const pos = consumer.originalPositionFor({
      column: parseInt(match[4], 10),
      line: parseInt(match[3], 10),
    });

    if (pos.line == null) {
      break;
    }

    if (pos.name) {
      outStack += `\n    at ${pos.name} (${pos.source}:${pos.line}:${pos.column})`;
    } else {
      if (match[1]) {
        outStack += `\n    at ${match[1]} (${pos.source}:${pos.line}:${pos.column})`;
      } else {
        outStack += `\n    at ${pos.source}:${pos.line}:${pos.column}`;
      }
    }
  }
  return outStack;
};
