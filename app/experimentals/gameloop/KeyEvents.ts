// Add this code within your GameLoop setup or initialization function
export function setupCanvasKeyListeners(canvasElement: any) {
    let ctrlPressed = false;
  
    // Listen for keydown events
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Control') {
        ctrlPressed = true;
      }
  
      if (ctrlPressed && event.key === 'c') {
        console.log('Ctrl+C detected');
        // Your code to handle Ctrl+C (copy action)
        event.preventDefault(); // Prevent default behavior if necessary
      }
  
      if (ctrlPressed && event.key === 'v') {
        console.log('Ctrl+V detected');
        // Your code to handle Ctrl+V (paste action)
        event.preventDefault(); // Prevent default behavior if necessary
      }
    });
  
    // Listen for keyup events
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Control') {
        ctrlPressed = false;
      }
    });
  
    // Optionally, if you want to focus only on the canvas element:
    canvasElement.addEventListener('keydown', (event) => {
      // Similar key handling logic can be placed here if needed.
    });
  }
  