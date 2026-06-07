'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Editor, Range } from '@tiptap/core';

export type SlashCommandItem = {
  title: string;
  description: string;
  command: (props: { editor: Editor; range: Range }) => void;
};

export type SlashCommandListRef = {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
};

type SlashCommandListProps = {
  items: SlashCommandItem[];
  command: (item: SlashCommandItem) => void;
};

export const SlashCommandList = forwardRef<SlashCommandListRef, SlashCommandListProps>(
  ({ items, command }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
      setSelectedIndex(0);
    }, [items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === 'ArrowUp') {
          setSelectedIndex((index) => (index + items.length - 1) % items.length);
          return true;
        }
        if (event.key === 'ArrowDown') {
          setSelectedIndex((index) => (index + 1) % items.length);
          return true;
        }
        if (event.key === 'Enter') {
          const item = items[selectedIndex];
          if (item) command(item);
          return true;
        }
        return false;
      },
    }));

    if (items.length === 0) {
      return (
        <div className="rounded-lg border border-border bg-popover p-3 text-sm text-muted-foreground shadow-lg">
          No results
        </div>
      );
    }

    return (
      <div className="rounded-lg border border-border bg-popover shadow-lg overflow-hidden min-w-[220px]">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className={`flex w-full flex-col items-start px-3 py-2 text-left text-sm transition-colors ${
              index === selectedIndex ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
            }`}
            onClick={() => command(item)}
          >
            <span className="font-medium">{item.title}</span>
            <span className="text-xs text-muted-foreground">{item.description}</span>
          </button>
        ))}
      </div>
    );
  }
);

SlashCommandList.displayName = 'SlashCommandList';

export const getSlashCommands = (): SlashCommandItem[] => [
  {
    title: 'Heading 1',
    description: 'Large section heading',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleHeading({ level: 1 }).run();
    },
  },
  {
    title: 'Heading 2',
    description: 'Medium section heading',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleHeading({ level: 2 }).run();
    },
  },
  {
    title: 'Bullet List',
    description: 'Unordered list',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: 'Numbered List',
    description: 'Ordered list',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: 'Quote',
    description: 'Blockquote',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    title: 'Code Block',
    description: 'Code snippet block',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
];
