import { 
    SpinnerCircularFixed, 
    SpinnerCircularFixedProps,
    
} from 'spinners-react';

export default function RoundedSpinner({size = 50, thickness = 100, speed = 100, color = "blue", secondaryColor = "#c9c6c5"} : SpinnerCircularFixedProps) {
  return (
    <div className='z-10 bg-white h-screen absolute w-full flex justify-center'>
        <SpinnerCircularFixed
      size={size}
      thickness={thickness}
      speed={speed}
      color={color}
      secondaryColor={secondaryColor}
    />
    </div>
  );
}
