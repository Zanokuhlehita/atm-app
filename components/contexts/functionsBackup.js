function registerPlay() {
  getData("availablePlays").then((plays) => {
    if (plays.dailyFreePlays > 0) {
      var newVlaue = plays.dailyFreePlays - 1;
      var availablePlays = { ...plays, dailyFreePlays: newVlaue };
      storeData(availablePlays, "availablePlays").then((e) => {
        console.log("Available Plays Update", availablePlays);
        checkForPlays();
        updateDailyFreePlays(newVlaue);
      });

      return true;
    }
    if (plays.promotionalPlays > 0) {
      var newVlaue = plays.promotionalPlays - 1;
      var availablePlays = { ...plays, promotionalPlays: newVlaue };
      storeData(availablePlays, "availablePlays").then((e) => {
        console.log("Available Plays Update", availablePlays);
        checkForPlays();
      });
      return true;
    }
    if (plays.premiumPlays > 0) {
      var newVlaue = plays.premiumPlays - 1;
      var availablePlays = { ...plays, premiumPlays: newVlaue };
      storeData(availablePlays, "availablePlays").then((e) => {
        console.log("Available Plays Update", availablePlays);
        checkForPlays();
      });
      return true;
    }
    alert(
      "Please note you out of plays, Choose a method to purchase more plays"
    );
    console.log(plays);
    return false;
  });
}
