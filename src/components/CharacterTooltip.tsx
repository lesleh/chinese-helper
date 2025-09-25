'use client';

import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react';
import { useState } from 'react';

interface CharacterInfo {
  chinese: string;
  pinyin: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  role: string;
}

interface CharacterTooltipProps {
  info: CharacterInfo;
  children: React.ReactNode;
}

export function CharacterTooltip({ info, children }: CharacterTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    move: false,
    delay: { open: 200, close: 150 },
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        className="cursor-pointer hover:bg-blue-100 px-1 py-0.5 rounded transition-colors duration-150 select-none"
        tabIndex={0}
      >
        {children}
      </span>
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-50"
          >
            <div className="space-y-3">
              {/* Character Display */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {info.chinese}
                </div>
                <div className="text-lg text-blue-600 font-medium">
                  {info.pinyin}
                </div>
                <div className="text-sm text-gray-500 italic">
                  &ldquo;{info.pronunciation}&rdquo;
                </div>
              </div>

              {/* Meaning and Grammar */}
              <div className="border-t pt-3 space-y-2">
                <div>
                  <span className="text-sm font-semibold text-gray-700">
                    Meaning:{' '}
                  </span>
                  <span className="text-sm text-gray-900">{info.meaning}</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-700">
                    Part of Speech:{' '}
                  </span>
                  <span className="text-sm text-gray-600 capitalize">
                    {info.partOfSpeech}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-700">
                    Role:{' '}
                  </span>
                  <span className="text-sm text-gray-600">{info.role}</span>
                </div>
              </div>
            </div>

            {/* Tooltip arrow */}
            <div className="absolute w-2 h-2 bg-white border-l border-t border-gray-200 rotate-45 -translate-x-1 -translate-y-1" 
                 style={{ 
                   left: '50%', 
                   bottom: '-4px',
                   borderRight: 'none',
                   borderBottom: 'none'
                 }} 
            />
          </div>
        </FloatingPortal>
      )}
    </>
  );
}