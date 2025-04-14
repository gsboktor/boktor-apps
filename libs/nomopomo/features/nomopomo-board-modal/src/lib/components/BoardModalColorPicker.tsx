import { setBoardFormValues } from '@boktor-apps/nomopomo/data-access/store';
import { ColorPickerComponent } from '@boktor-apps/shared/ui/assets/svgs';
import { Direction, useRenderDirection } from '@boktor-apps/shared/ui/hooks';
import { useSetAtom } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

export const ColorPicker = styled(motion.div)<{ $dir?: Direction; $height?: number }>`
  position: absolute;
  width: max-content;
  height: fit-content;
  border-radius: 24px;
  background-color: #8787877c;
  backdrop-filter: blur(12px);
  padding: 8px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, auto);
  row-gap: 6px;
  column-gap: 6px;
  align-items: center;
  overflow: visible;
  z-index: 10000;

  align-items: center;
  overflow: visible;
  z-index: 10000;

  ${({ $dir, $height }) => {
    if ($dir === Direction.UP)
      return css`
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 6px;
      `;
    return css`
      left: 50%;
      transform: translateX(-50%);
      top: ${$height! + 6}px;
    `;
  }}
`;

const ColorPickerButton = styled.div`
  position: relative;
  display: flex;
  outline: none;
  border: none;
  width: 100%;
  align-items: center;
  background-color: transparent;
  justify-content: center;
`;

const ColorPickerButtonContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  padding-right: 24px;
  align-items: center;
  justify-content: center;
  height: fit-content;
  width: 100%;
`;

const ColorSample = styled(motion.div)<{ $color: string }>`
  /* position: sticky; */
  width: 36px;
  height: 36px;
  display: flex;
  border: none;
  bottom: 0;
  cursor: pointer;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  filter: brightness(1.025);
`;
const defaultColors = [
  '#FFB5B5', // Soft pink
  '#FFD4B2', // Peach
  '#FFF4BD', // Soft yellow
  '#C1E1C1', // Mint green
  '#B5D8EB', // Sky blue
  //   '#C9B6E4', // Lavender
  '#FFCACC', // Light coral
  //   '#E8D5C4', // Warm beige
  //   '#B7E5D9', // Seafoam
  '#CCE2CB', // Sage green
  //   '#C5D5EA', // Powder blue
  '#E6B8C2', // Dusty rose
  '#B8D8BE', // Pistachio
  '#F7D1BA', // Apricot
  '#A6CCE6', // Baby blue
  //   '#E6D7EE', // Lilac mist
  //   '#FFE2B8', // Pale marigold
  //   '#B8E6D4', // Mint frost
  //   '#E6C9C9', // Vintage mauve
  '#D1E6B8', // Celery
  '#B8C2E6', // Periwinkle
  '#E6E6B8', // Lemon chiffon
  '#D4B8E6',
  //   '#D44444',
];

export const BoardModalColorPicker = () => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const { direction } = useRenderDirection(pickerRef);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [previewColor, setPreviewColor] = useState<string>(() => defaultColors[0]);
  const setBoardValue = useSetAtom(setBoardFormValues);

  const handleColorPicked = useCallback(
    (color: string) => {
      setBoardValue({ boardTheme: color });
      setPreviewColor(color);
      setShowPicker(false);
    },
    [setBoardValue],
  );

  return (
    <ColorPickerButton>
      <AnimatePresence>
        {showPicker && (
          <ColorPicker
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseEnter={() => setShowPicker(true)}
            onMouseLeave={() => setShowPicker(false)}
            $dir={direction.current}
            $height={pickerRef.current?.getBoundingClientRect().height}
            whileHover={{
              padding: `16px`,
            }}
          >
            {defaultColors.map((color, index) => (
              <ColorSample
                role="button"
                layout
                key={color}
                $color={color}
                initial={{ height: 0 }}
                animate={{ height: 36, transition: { delay: (index + 1) * 0.05 } }}
                onClick={() => {
                  handleColorPicked(color);
                }}
                whileHover={{
                  margin: 6,
                  scale: 1.15,
                  backgroundColor: color,
                  boxShadow: `0px 0px 20px 2px #5b5b5b7b`,
                }}
              />
            ))}
          </ColorPicker>
        )}
      </AnimatePresence>
      <ColorPickerButtonContent>
        <ColorPickerComponent width={24} height={24} />
        <ColorSample
          layout
          $color={previewColor}
          ref={pickerRef}
          onMouseEnter={() => setShowPicker(true)}
          onMouseLeave={() => setShowPicker(false)}
        />
      </ColorPickerButtonContent>
    </ColorPickerButton>
  );
};
