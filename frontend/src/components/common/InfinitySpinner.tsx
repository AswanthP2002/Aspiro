import { SpinnerInfinity, SpinnerInfinityProps } from 'spinners-react';

export default function InfinitySpinner({size = 50, thickness = 100, speed = 100, color = "blue", secondaryColor = "#c9c6c5"} : SpinnerInfinityProps) {
  return (
    <div className='z-10 bg-white h-screen absolute w-full flex justify-center'>
        <SpinnerInfinity
      size={size}
      thickness={thickness}
      speed={speed}
      color={color}
      secondaryColor={secondaryColor}
    />
    </div>
  );
}
