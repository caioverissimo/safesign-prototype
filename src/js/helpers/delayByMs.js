export async function delayByMs(delayTimeInMs = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, delayTimeInMs);
  });
}