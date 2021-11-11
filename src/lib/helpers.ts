export const pause = (t: number) => {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
};
