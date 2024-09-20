import React from 'react'
import classNames from 'classnames';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
      <div className="h-2 w-full bg-neutral-200">
          <div
              className={classNames('h-full bg-green-500 transition-all duration-500 ease-in', {
                  'rounded-r-md': progress < 100,
              })}
              style={{ width: `${progress}%` }}
          ></div>
      </div>
  );
}
