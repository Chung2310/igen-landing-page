import React from 'react';

/**
 * Flowing multi-color "silk" gradient background (Stripe-style).
 * Pure-CSS animated gradient layers + diagonal silk sheen bands.
 * Self-contained, no dependencies, no SVG-filter reference (which can
 * silently hide the element in some browsers).
 * Render it as an absolutely-positioned layer inside a `relative` hero.
 */
export const SilkBackground: React.FC = () => (
  <div className="silk-bg" aria-hidden="true">
    <div className="silk-layer silk-layer-1"></div>
    <div className="silk-layer silk-layer-2"></div>
    <div className="silk-waves"></div>
    <div className="silk-overlay"></div>
  </div>
);
