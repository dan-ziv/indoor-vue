function fetchImage() {
  const storage = firebase.storage();
  const storageRef = storage.ref();
  return storageRef.child("images/scan.jpg").getDownloadURL();
}

export { fetchImage };
