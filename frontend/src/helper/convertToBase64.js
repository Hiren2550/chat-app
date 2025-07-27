export const convertToBase64 = (file, setBase64URL) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setBase64URL(reader.result);
  };
  reader.onerror = (error) => {};
};
