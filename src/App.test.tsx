import React from 'react';

// Ensure the DOM has an element with id="root" before importing index.tsx.
beforeEach(() => {
  document.body.innerHTML = '<div id="root"></div>';
});

describe('Index file', () => {
  test('sets the document title to "The Game Counter"', () => {
    // Use jest.isolateModules so that the module's top-level code runs fresh.
    jest.isolateModules(() => {
      require('./index.tsx'); // Adjust the path if necessary.
    });
    expect(document.title).toBe('The Game Counter');
  });
});
