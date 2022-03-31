import {
  useState, useMemo, useEffect, useCallback,
} from 'react';

  type ScreenSizeType = {
    height: number;
    width: number;
  }

const useResize = (): ScreenSizeType => {
  const [height, setHeight] = useState(getHeight());
  const [width, setWidth] = useState(getWidth());

  const size = useMemo(() => ({ height, width }), [height, width]);
  const memoResizeHandler = useCallback(resizeHandler, []);

  useEffect(() => {
    window.addEventListener('resize', memoResizeHandler);
    return () => window.removeEventListener('resize', memoResizeHandler);
  }, [memoResizeHandler]);

  function resizeHandler() {
    setHeight(getHeight());
    setWidth(getWidth());
  }

  function getHeight() {
    return window.innerHeight;
  }

  function getWidth() {
    return window.innerWidth;
  }

  return size;
};

export default useResize;
