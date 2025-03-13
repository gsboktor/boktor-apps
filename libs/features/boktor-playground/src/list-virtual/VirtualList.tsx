import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import data from '../assets/list_items.json';

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 475px;
  height: 100%;
  max-width: 600px;
  align-self: center;
  overflow: scroll;
  border: 2px solid black;
  border-radius: 6px;
`;

const ListItem = styled.li`
  padding: 6px 12px;
  display: flex;
  height: fit-content;
  position: absolute;
`;

/*
 * To implement virtualization, consider these key concepts:
 *
 * 1. Viewport dimensions
 *    - Track the visible height of the container
 *    - Use useRef + ResizeObserver to measure container
 *
 * 2. Item dimensions
 *    - Need fixed height for each list item
 *    - Or measure first render and cache heights
 *
 * 3. Scroll position
 *    - Track scrollTop value
 *    - Use onScroll event handler
 *
 * 4. Visible window calculation
 *    - Based on scroll position, determine visible index range
 *    - Add buffer items above/below viewport
 *    - Only render items in range
 *
 * 5. Position items absolutely
 *    - Use transform: translateY()
 *    - Or top positioning
 *    - Maintains scroll height while rendering subset
 *
 * Key formulas:
 * - First visible index = Math.floor(scrollTop / itemHeight)
 * - Visible count = Math.ceil(viewportHeight / itemHeight)
 * - Buffer = 1-2 viewports worth of items
 */

export const VirtualList = () => {
  const [items, setItems] = useState(() => [...data]);
  const [itemCount, setItemCount] = useState(0);
  const itemListRangeStart = useRef<number>(0);
  const [height, setHeight] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);

  const containerRef = useRef<HTMLUListElement>(null);
  const elementRef = useRef<HTMLLIElement>(null);

  useLayoutEffect(() => {
    const ctrHeight = containerRef.current?.getBoundingClientRect().height ?? 1;
    const elHeight = elementRef.current?.getBoundingClientRect().height ?? 1;

    const itemsCountFit = Math.ceil(ctrHeight / 34);
    setHeight(34);
    setItemCount(itemsCountFit);
  }, []);

  const onScrollChange = useCallback(
    (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
      setOffsetTop(e.currentTarget.scrollTop ?? 0);
    },
    [height],
  );

  itemListRangeStart.current = Math.floor(offsetTop / height);
  console.log('curr', itemListRangeStart.current);

  const subList = items.slice(
    itemListRangeStart.current ?? 0,
    Math.min(itemListRangeStart.current + itemCount, items.length),
  );

  const invisibleHeight = (items.length - (itemListRangeStart.current ?? 0) + itemCount) * height; // 10, start = 2, end = 6

  return (
    <Container ref={containerRef} onScroll={(e) => onScrollChange(e)}>
      <div
        style={{ position: 'absolute', height: `${items.length * height}px`, display: 'flex', top: 0, width: '100%' }}
      >
        {subList.map((item, idx) => {
          return (
            <ListItem
              ref={elementRef}
              key={crypto.randomUUID()}
              style={{ top: `${((itemListRangeStart.current ?? 0) + idx) * height}px` }}
            >
              {item.label}
            </ListItem>
          );
        })}
        <div style={{ height: `${invisibleHeight}px` }}></div>
      </div>
    </Container>
  );
};
