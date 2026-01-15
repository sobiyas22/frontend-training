function executeAfterDelay(callback) {
    setTimeout(callback, 10000);
}

executeAfterDelay(() => {
    console.log("Executed after 10 seconds");
});
