import './LoadingAnimation.css';

export function LoadingAnimation() {
  return (
    <div className="loading-container">
      <div className="stack">
        <div className="stack__card"></div>
        <div className="stack__card"></div>
        <div className="stack__card"></div>
      </div>
    </div>
  );
}
