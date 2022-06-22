type SlideProps = {
  duration: number;
  vector: 'X' | 'Y';
  easing: (t: number) => number;
};

export const scaleVector = (node: Node, props: SlideProps) => ({
  duration: props.duration,
  css: (t: number) => `transform: scale${props.vector}(${props.easing(t)});`,
});
