"use client";

import { useState, useEffect } from 'react';

export default function PostContent({ content = '' }) {
  const [mounted, setMounted] = useState(false);
  const [processedHtml, setProcessedHtml] = useState(content);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!content) return;

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const body = doc.body;

      // Strip ALL native WP Recipe Maker (WPRM) recipe blocks to prevent duplicate recipe cards.
      // Our custom RecipeDetailContainer already renders the parsed recipe data separately.
      const wprmSelectors = [
        '.wprm-recipe-container',
        '.wprm-recipe',
        'div[data-recipe-id]',
        '.wprm-recipe-roundup-item',
        '.wprm-print-recipe-shortcode',
        '.wprm-recipe-jump',
        '.wprm-jump-to-recipe-shortcode',
        '.wprm-nutrition-label-container',
        '[class*="wprm-recipe"]',
        '[id*="wprm-recipe"]'
      ];
      wprmSelectors.forEach(selector => {
        const elements = body.querySelectorAll(selector);
        elements.forEach(el => el.remove());
      });

      // Inject robust client-side onerror handlers to hide any broken/cut images
      const imgTags = body.querySelectorAll('img');
      imgTags.forEach(img => {
        img.setAttribute('onerror', "this.style.display='none'; if(this.parentElement && (this.parentElement.tagName === 'FIGURE' || this.parentElement.tagName === 'P')) { if (!this.parentElement.textContent.trim()) this.parentElement.style.display='none'; }");
      });

      // Select all image wrapper elements in a robust way, filtering out nested duplicate selectors
      const allImgNodes = Array.from(body.querySelectorAll('figure, p, img')).filter(el => {
        if (el.tagName === 'IMG') return true;
        return el.querySelector('img') !== null;
      });

      const imageElements = [];
      allImgNodes.forEach(node => {
        const hasParentInList = imageElements.some(parent => parent.contains(node));
        if (!hasParentInList) {
          const childrenIndices = [];
          imageElements.forEach((existing, idx) => {
            if (node.contains(existing)) {
              childrenIndices.push(idx);
            }
          });
          if (childrenIndices.length > 0) {
            for (let idx = childrenIndices.length - 1; idx >= 0; idx--) {
              imageElements.splice(childrenIndices[idx], 1);
            }
          }
          imageElements.push(node);
        }
      });

      const headingElements = Array.from(body.querySelectorAll('h2, h3, h4'));

      // Cleanly distribute images: assign at most one image immediately after each heading
      if (imageElements.length > 0 && headingElements.length > 0) {
        const limit = Math.min(imageElements.length, headingElements.length);
        
        for (let i = 0; i < limit; i++) {
          const img = imageElements[i];
          const heading = headingElements[i];
          if (body.contains(heading) && body.contains(img)) {
            heading.after(img);
          }
        }
        
        // If we have remaining images, space them out after text paragraphs, or remove them to prevent consecutive stacking
        if (imageElements.length > headingElements.length) {
          const paragraphs = Array.from(body.querySelectorAll('p')).filter(p => 
            !p.querySelector('img') && p.textContent.trim().length > 50
          );
          let pIndex = paragraphs.length - 1;
          
          for (let i = headingElements.length; i < imageElements.length; i++) {
            const img = imageElements[i];
            if (pIndex >= 0 && body.contains(paragraphs[pIndex])) {
              paragraphs[pIndex].after(img);
              pIndex -= 2; // Space out by at least 2 paragraphs
            } else {
              // Remove excessive stacked images that cannot be distributed, keeping it clean and professional
              img.remove();
            }
          }
        }
      }

      setProcessedHtml(body.innerHTML);
    } catch (error) {
      console.error("Non-blocking failure: failed to redistribute consecutive images:", error);
      setProcessedHtml(content);
    }
  }, [content]);

  if (!mounted) {
    // Elegant light shimmer block during server render to prevent hydration conflicts
    return (
      <div style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
        <div style={{ height: '20px', width: '100%', background: 'rgba(54, 84, 59, 0.05)', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
        <div style={{ height: '20px', width: '90%', background: 'rgba(54, 84, 59, 0.05)', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
        <div style={{ height: '20px', width: '95%', background: 'rgba(54, 84, 59, 0.05)', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
        <div style={{ height: '180px', width: '100%', background: 'rgba(54, 84, 59, 0.03)', borderRadius: '12px', margin: '1rem 0' }} />
        <div style={{ height: '20px', width: '85%', background: 'rgba(54, 84, 59, 0.05)', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
      </div>
    );
  }

  return (
    <div 
      className="wp-content animate-fade-in"
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
}
