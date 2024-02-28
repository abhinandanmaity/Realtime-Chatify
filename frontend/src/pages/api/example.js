


export default async function handler(req, res) {

    console.log("kdfjh")
    if (req.method == 'GET') {

        console.log("jfhkjfdherioioure")

        res.status(200).json({ success: "success" })
    } else {
        res.status(400).json({ error: "Invalid credentials" })
    }
}
