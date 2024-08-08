//Key Events for Ctrl + C and Ctrl + V
export function setupCanvasKeyListeners(canvasElement: any) {
    let ctrlOrCmdPressed = false;
  
    // Listen for keydown events
    canvasElement.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        ctrlOrCmdPressed = true;
      }
  
      if (ctrlOrCmdPressed && event.key.toLowerCase() === 'c') {
        console.log('Ctrl+C or Cmd+C detected');
        // Your code to handle Ctrl+C or Cmd+C (copy action)
        event.preventDefault(); // Prevent default behavior if necessary
      }
  
      if (ctrlOrCmdPressed && event.key.toLowerCase() === 'v') {
        console.log('Ctrl+V or Cmd+V detected');
        // Your code to handle Ctrl+V or Cmd+V (paste action)
        event.preventDefault(); // Prevent default behavior if necessary
      }
    });
  
    // Listen for keyup events
    canvasElement.addEventListener('keyup', (event: KeyboardEvent) => {
      if (!event.ctrlKey && !event.metaKey) {
        ctrlOrCmdPressed = false;
      }
    });
  
    // Optionally, if you want to focus only on the canvas element:
    canvasElement.addEventListener('keydown', (event: KeyboardEvent) => {
        console.log('Key pressed:', event.key);
      // Similar key handling logic can be placed here if needed.
    });
  }
  