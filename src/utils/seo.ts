export const buildTitle = (title: string) => {
  return title.includes('WEC Pitwall') ? title : `${title} | WEC Pitwall`;
};
