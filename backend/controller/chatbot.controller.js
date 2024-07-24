export const chat = async (req, res) => {
    console.log("APi Call")
    const apiRequestBody = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiRequestBody),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response from OpenAI API');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error in Chat Bot Controller", error);
        res.status(500).send(error.message);
    }
}
