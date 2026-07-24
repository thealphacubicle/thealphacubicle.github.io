import React from 'react';

function Sparkline({ points, stroke = '#71717A', fill = 'transparent', width = 120, height = 48 }) {
  if (!points || points.length < 2) {
    return null;
  }

  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const stepX = width / (points.length - 1);
  const coordinates = points
    .map((point, index) => {
      const x = index * stepX;
      const normalizedY = (point - min) / span;
      const y = height - normalizedY * height;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPath = `M0,${height} L${coordinates.replace(/ /g, ' L')} L${width},${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-hidden>
      <path d={areaPath} fill={fill} />
      <polyline
        points={coordinates}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Sparkline;
