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
        '.wprm-nutrition-label-container'
      ];
      wprmSelectors.forEach(selector => {
        const elements = body.querySelectorAll(selector);
        elements.forEach(el => el.remove());
      });

      // Select all images, paragraphs containing images, and figure elements
      const imageElements = Array.from(body.querySelectorAll('figure:has(img), p:has(img), img')).filter(el => {
        // Keep elements that are direct children of the body, or immediate wrappers, to prevent breaking small grids
        return el.parentElement === body || el.parentElement?.parentElement === body;
      });

      const headingElements = Array.from(body.querySelectorAll('h2, h3, h4'));

      // If we have multiple images and multiple headings, redistribute consecutive ones!
      if (imageElements.length > 1 && headingElements.length > 1) {
        let headingIndex = 0;

        for (let i = 0; i < imageElements.length; i++) {
          const currentImg = imageElements[i];

          // Check if this image is consecutive to the previous one without any headings in between
          if (i > 0) {
            const prevImg = imageElements[i - 1];

            let hasHeadingBetween = false;
            let sibling = prevImg.nextSibling;
            while (sibling && sibling !== currentImg) {
              if (sibling.nodeType === Node.ELEMENT_NODE) {
                if (sibling.matches('h2, h3, h4') || sibling.querySelector('h2, h3, h4')) {
                  hasHeadingBetween = true;
                  break;
                }
              }
              sibling = sibling.nextSibling;
            }

            // If there's no heading between them, we have stacked/parallel images!
            if (!hasHeadingBetween) {
              // Move this consecutive image after the next available heading that is positioned after the previous image
              while (headingIndex < headingElements.length) {
                const targetHeading = headingElements[headingIndex];
                headingIndex++;

                // Ensure the heading is actually in the DOM (not deleted)
                if (body.contains(targetHeading)) {
                  targetHeading.after(currentImg);
                  break;
                }
              }
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
