var express = require("express");
var app = express();
var nodemailer = require('nodemailer');
var cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'konda.mahesh1280@gmail.com',
        pass: 'qlro dtmq bhcx mjhq'
    }
});

app.post("/submit", async (req,res)=>{
    var {name,email,message} = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    var mailOptions = {
        from: email,
        to: 'konda.mahesh1280@gmail.com',
        subject: 'Contact Form Submission',
        text: `You received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    }
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email." });
    }
})

const port = 3005;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})