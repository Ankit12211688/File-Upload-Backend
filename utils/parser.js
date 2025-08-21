export const parseFile = async (filePath, mimetype) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // fake parsed data
            resolve({
                message: "File parsed successfully",
                sampleData: ["row1", "row2", "row3"],
            });
        }, 5000); // simulate 5s parsing delay
    });
};
