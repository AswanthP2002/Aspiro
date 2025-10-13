import { SpinnerCircular, SpinnerCircularProps } from 'spinners-react';

export default function CircularSpinner ({
  size = 50,
  thickness = 100,
  speed = 100,
  color = 'blue',
  secondaryColor = 'black',
}: SpinnerCircularProps) {
  return (
    <SpinnerCircular
      size={size}
      thickness={thickness}
      speed={speed}
      color={color}
      secondaryColor={secondaryColor}
    />
  );
}
