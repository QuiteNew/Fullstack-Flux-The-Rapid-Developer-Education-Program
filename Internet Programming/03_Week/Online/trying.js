const getWeko = () => {
    if (Math.random() > 0.5) {
        const weko= {
            name: "Weko",
            age: 0x31
        };
        return weko;
    } else {
        // return null;
        throw new Error("Weko is not available");
    }
};

try {
    const weko = getWeko();
    console.log(`The logical value of weko is: ${!!weko}`);
    console.log(weko.name.toUpperCase());
} catch (error) {
    console.error(error.message);
} finally {
    console.log("Execution completed.");
}