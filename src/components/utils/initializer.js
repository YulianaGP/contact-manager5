// Function that returns a personalised Promise
export function initializeApp(duration = 3000) {
    return new Promise((resolve) => {
        // setTimeout simulates an operation that takes time
        setTimeout(() => {
            resolve(false); // This resolve will take 3000 ms to be executed.
        }, duration);
    });
}

// Function with error handing 
export const loadAppData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.3; // 70% of success
        
        if (success) {
          resolve(false); // It finished loading (false)
        } else {
          reject(true); // It failed to load (true)
        }
      }, 2000);
    });
  };