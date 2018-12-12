function fetchStats() {
  const database = firebase.database();
  const databaseRef = database.ref("/robots/1");
  return databaseRef.once("value").then(snapshot => snapshot.val());
}

function statsListeners(robot) {
  const database = firebase.database();

  const batteryRef = database.ref("/robots/1/battery");
  batteryRef.on("value", function(snapshot) {
    robot.setBattery(snapshot.val());
  });

  const locationRef = database.ref("/robots/1/location");
  locationRef.on("value", function(snapshot) {
    robot.setLocation(snapshot.val());
  });
}

export { fetchStats, statsListeners };
