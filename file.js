const fs = require("fs") //inbuilt package - Filesystem

fs.readFile("./welcome.txt", "utf-8", (err, data) => {
    console.log(data);
});

const quote ="Welcome to GUVI ZEN Class - B28WD";

fs.writeFile("./awesome.txt", quote, (err) => {
    console.log("completed writing ...!!!");
})

const quote2 = "Live more, worry less ..!"

for (let i=1; i<=10; i++) {
    fs.writeFile(`./backup/text-${i}.html`, quote2, (err) =>{
        console.log("Completed Created...!!!", i);
    })
}

function creatQuotes(noOfFiles,quote2){
    for (let i=1; i<=noOfFiles; i++) {
        fs.writeFile(`./backup/text-${i}.html`, quote2, (err) =>{
            console.log("Completed Created...!!!", i);
        });
    }
}

const [, , noOfFiles] = process.argv;
creatQuotes(noOfFiles,quote2)


//To Delete the File use (unlink)
// fs.unlink("./awesome.txt", (err) => {
//     console.log("Deleted Successfully" )
// })

// To Read the files use (readdir)

fs.readdir("./backup", (err, files) => {
    console.log(files);
})
