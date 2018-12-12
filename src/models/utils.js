function doWork() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, Math.floor(Math.random() * 10) * 1000);
  });
}

export { doWork };
