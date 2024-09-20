import React from 'react'
import ProgressBar from './ProgressBar';

interface BackgroundProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

export default function Background({ currentStep, totalSteps, children }: BackgroundProps) {
  return (
    <div className={`flex w-full flex-col items-center`}>
      <div
          className={`sticky w-full z-20`}
      >
          <ProgressBar totalSteps={totalSteps} currentStep={currentStep + 1} />
      </div>
      {children}
    </div>
  )
}
